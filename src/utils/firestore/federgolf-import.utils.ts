import { ICourse, ITeebox } from '@/types/course.types';
import { db } from '@/utils/firebase/firebase.utils';
import {
	collection,
	getDocs,
	writeBatch,
	doc,
	serverTimestamp,
} from 'firebase/firestore';

const FEDERGOAL_URL = 'https://areariservata.federgolf.it/SlopeAndCourseRating/Index';
const COURSES_COLLECTION = 'golf_courses';

const TEE_CONFIGS: { name: string; color: string; gender: 'M' | 'F'; colIndex: number }[] = [
	{ name: 'Nero', color: '#000000', gender: 'M', colIndex: 0 },
	{ name: 'Bianco', color: '#ffffff', gender: 'M', colIndex: 2 },
	{ name: 'Giallo', color: '#ffd700', gender: 'M', colIndex: 4 },
	{ name: 'Verde', color: '#2e7d32', gender: 'M', colIndex: 6 },
	{ name: 'Blu', color: '#1976d2', gender: 'F', colIndex: 8 },
	{ name: 'Rosso', color: '#d32f2f', gender: 'F', colIndex: 10 },
	{ name: 'Arancio', color: '#ff9800', gender: 'F', colIndex: 12 },
];

interface ParsedRow {
	club: string;
	course: string;
	par: number;
	teeData: (string | null)[]; // 14 values: CR/Slope for 7 tees
}

function parseFedergolfHtml(html: string): ParsedRow[] {
	const rows: ParsedRow[] = [];
	const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);
	if (!tbodyMatch) return rows;

	const tbody = tbodyMatch[1];
	const trRegex = /<tr>([\s\S]*?)<\/tr>/gi;
	let trMatch: RegExpExecArray | null;

	while ((trMatch = trRegex.exec(tbody)) !== null) {
		const trContent = trMatch[1];
		const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
		const cells: string[] = [];
		let tdMatch: RegExpExecArray | null;

		while ((tdMatch = tdRegex.exec(trContent)) !== null) {
			const val = tdMatch[1].trim();
			cells.push(val);
		}

		if (cells.length < 17) continue;

		const club = cells[0].trim();
		const courseName = cells[1].trim();
		const par = parseInt(cells[2], 10);
		if (!club || !courseName || isNaN(par)) continue;

		const teeData: (string | null)[] = [];
		for (let i = 3; i < cells.length && i < 17; i++) {
			const val = cells[i].trim();
			teeData.push(val || null);
		}

		rows.push({ club, course: courseName, par, teeData });
	}

	return rows;
}

function parseNumber(val: string | null): number | null {
	if (!val) return null;
	const n = parseFloat(val);
	return isNaN(n) ? null : n;
}

function rowsToCourseData(rows: ParsedRow[]): Omit<ICourse, 'id' | 'createdAt' | 'updatedAt'>[] {
	return rows.map((row) => {
		const teeboxes: ITeebox[] = [];

		for (const tee of TEE_CONFIGS) {
			const cr = parseNumber(row.teeData[tee.colIndex]);
			const sr = parseNumber(row.teeData[tee.colIndex + 1]);
			if (cr !== null && sr !== null && cr > 0 && sr > 0) {
				teeboxes.push({
					name: tee.name,
					color: tee.color,
					gender: tee.gender,
					par: row.par,
					courseRating: cr,
					slopeRating: sr,
					length: 0,
				});
			}
		}

		const holes: 9 | 18 = row.par <= 36 ? 9 : 18;

		return {
			name: `${row.club} - ${row.course}`,
			city: '',
			country: 'IT',
			holes,
			status: 'Active' as const,
			teeboxes,
		};
	});
}

async function fetchWithFallback(url: string): Promise<string> {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
		if (response.ok) return await response.text();
	} catch {
		// Direct fetch failed — try CORS proxy
	}

	const proxies = [
		`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
		`https://corsproxy.io/?${encodeURIComponent(url)}`,
	];

	for (const proxy of proxies) {
		try {
			const response = await fetch(proxy, { signal: AbortSignal.timeout(20000) });
			if (response.ok) return await response.text();
		} catch {
			continue;
		}
	}

	throw new Error(
		'Unable to fetch data from Federgolf. The server may be blocking cross-origin requests. ' +
			'Try running the seed script instead: npx tsx src/scripts/seed-federgolf.ts'
	);
}

export interface ImportResult {
	total: number;
	created: number;
	updated: number;
	errors: string[];
}

export async function importFromFedergolf(): Promise<ImportResult> {
	const result: ImportResult = { total: 0, created: 0, updated: 0, errors: [] };

	const html = await fetchWithFallback(FEDERGOAL_URL);

	const parsed = parseFedergolfHtml(html);
	if (parsed.length === 0) {
		throw new Error('No course data found in Federgolf response. The page structure may have changed.');
	}

	const courses = rowsToCourseData(parsed);
	result.total = courses.length;

	const coursesRef = collection(db, COURSES_COLLECTION);

	const existingSnap = await getDocs(coursesRef);
	const existingMap = new Map<string, string>();
	existingSnap.forEach((docSnap) => {
		const data = docSnap.data();
		if (data.name) existingMap.set(data.name, docSnap.id);
	});

	const BATCH_SIZE = 500;
	let batch = writeBatch(db);
	let ops = 0;

	for (const course of courses) {
		const existingId = existingMap.get(course.name);

		if (existingId) {
			batch.update(doc(db, COURSES_COLLECTION, existingId), {
				...course,
				updatedAt: serverTimestamp(),
			});
			result.updated++;
		} else {
			batch.set(doc(collection(db, COURSES_COLLECTION)), {
				...course,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			});
			result.created++;
		}

		ops++;
		if (ops >= BATCH_SIZE) {
			await batch.commit();
			batch = writeBatch(db);
			ops = 0;
		}
	}

	if (ops > 0) {
		await batch.commit();
	}

	return result;
}

export async function fetchFedergolfPreview(): Promise<{ clubCount: number; courseCount: number; sampleCourses: string[] }> {
	const html = await fetchWithFallback(FEDERGOAL_URL);
	const parsed = parseFedergolfHtml(html);

	const uniqueClubs = new Set(parsed.map((r) => r.club));
	const sampleNames = parsed.slice(0, 5).map((r) => `${r.club} - ${r.course} (Par ${r.par})`);

	return {
		clubCount: uniqueClubs.size,
		courseCount: parsed.length,
		sampleCourses: sampleNames,
	};
}
