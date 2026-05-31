import { ICourse } from '@/types/course.types';
import { db } from '@/utils/firebase/firebase.utils';
import {
	collection,
	doc,
	DocumentData,
	DocumentReference,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	query,
	orderBy,
	Timestamp,
} from 'firebase/firestore';

const COURSES_COLLECTION = 'golf_courses';

const convertTimestamps = (data: Record<string, unknown>): Record<string, unknown> => {
	const result = { ...data };
	if (result.createdAt instanceof Timestamp) {
		result.createdAt = result.createdAt.toMillis();
	}
	if (result.updatedAt instanceof Timestamp) {
		result.updatedAt = result.updatedAt.toMillis();
	}
	return result;
};

export const getAllCourses = async (): Promise<ICourse[]> => {
	try {
		const coursesRef = collection(db, COURSES_COLLECTION);
		const coursesQuery = query(coursesRef, orderBy('name', 'asc'));
		const snapshot = await getDocs(coursesQuery);

		return snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				...convertTimestamps(data),
				id: doc.id,
			} as ICourse;
		});
	} catch (error: any) {
		console.error('course.firestore: Error fetching all courses:', error);
		throw error;
	}
};

export const getCourseById = async (id: string): Promise<ICourse | null> => {
	if (!id) {
		console.error('getCourseById: Course ID is required.');
		throw new Error('Course ID not provided.');
	}

	try {
		const courseDocRef: DocumentReference<DocumentData> = doc(db, COURSES_COLLECTION, id);
		const snapshot = await getDoc(courseDocRef);

		if (!snapshot.exists()) {
			return null;
		}

		const data = snapshot.data();
		return {
			...convertTimestamps(data),
			id: snapshot.id,
		} as ICourse;
	} catch (error: any) {
		console.error('course.firestore: Error fetching course by ID:', error);
		throw error;
	}
};

export const createCourse = async (
	data: Omit<ICourse, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
	if (!data.name) {
		console.error('createCourse: Course name is required.');
		throw new Error('Course name not provided.');
	}

	try {
		const coursesRef = collection(db, COURSES_COLLECTION);
		const docRef = await addDoc(coursesRef, {
			...data,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
		return docRef.id;
	} catch (error: any) {
		console.error('course.firestore: Error creating course:', error);
		throw error;
	}
};

export const updateCourse = async (
	id: string,
	data: Partial<Omit<ICourse, 'id' | 'createdAt'>>
): Promise<void> => {
	if (!id) {
		console.error('updateCourse: Course ID is required.');
		throw new Error('Course ID not provided.');
	}

	try {
		const courseDocRef: DocumentReference<DocumentData> = doc(db, COURSES_COLLECTION, id);
		await updateDoc(courseDocRef, {
			...data,
			updatedAt: serverTimestamp(),
		});
	} catch (error: any) {
		console.error('course.firestore: Error updating course:', error);
		throw error;
	}
};

export const deleteCourse = async (id: string): Promise<void> => {
	if (!id) {
		console.error('deleteCourse: Course ID is required.');
		throw new Error('Course ID not provided.');
	}

	try {
		const courseDocRef: DocumentReference<DocumentData> = doc(db, COURSES_COLLECTION, id);
		await deleteDoc(courseDocRef);
	} catch (error: any) {
		console.error('course.firestore: Error deleting course:', error);
		throw error;
	}
};
