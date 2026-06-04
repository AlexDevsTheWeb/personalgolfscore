import { ICourse } from '@/types/course.types';
import { getCourseByName, getAllCourses } from '@/utils/firestore/course.firestore';
import { IParsedRound } from './ImportRoundParser.utils';

export interface ICourseMatchResult {
  courseId: string | null;
  courseName: string;
  matched: boolean;
  matchMethod: 'exact' | 'like' | 'first' | null;
  teeboxName: string;
  teeboxPar: number;
  teeboxCR: number;
  teeboxSR: number;
  warning: string | null;
}

export async function matchCourse(
  courseName: string,
  cr: number,
  sr: number,
  courses: ICourse[]
): Promise<ICourseMatchResult> {
  const normalizedName = courseName.trim().toUpperCase().replace(/\s+/g, ' ');

  const exactMatch = courses.find((c) => c.name.toUpperCase() === normalizedName);
  if (exactMatch) {
    return findTeebox(exactMatch, cr, sr, 'exact');
  }

  const likeMatches = courses.filter(
    (c) => c.name.toUpperCase().includes(normalizedName) || normalizedName.includes(c.name.toUpperCase())
  );

  if (likeMatches.length === 1) {
    return findTeebox(likeMatches[0], cr, sr, 'like');
  }

  if (likeMatches.length > 1) {
    const result = findTeebox(likeMatches[0], cr, sr, 'first');
    result.warning = `Multiple courses matched '${courseName}'. Using first result.`;
    return result;
  }

  return {
    courseId: null,
    courseName: courseName,
    matched: false,
    matchMethod: null,
    teeboxName: '',
    teeboxPar: 0,
    teeboxCR: 0,
    teeboxSR: 0,
    warning: null,
  };
}

function findTeebox(course: ICourse, cr: number, sr: number, method: 'exact' | 'like' | 'first'): ICourseMatchResult {
  const teebox = course.teeboxes.find(
    (t) => Math.abs(t.courseRating - cr) < 0.01 && t.slopeRating === sr
  );

  if (teebox) {
    return {
      courseId: course.id,
      courseName: course.name,
      matched: true,
      matchMethod: method,
      teeboxName: teebox.name,
      teeboxPar: teebox.par,
      teeboxCR: teebox.courseRating,
      teeboxSR: teebox.slopeRating,
      warning: null,
    };
  }

  const firstTee = course.teeboxes[0];
  return {
    courseId: course.id,
    courseName: course.name,
    matched: true,
    matchMethod: method,
    teeboxName: firstTee?.name || '',
    teeboxPar: firstTee?.par || 0,
    teeboxCR: firstTee?.courseRating || 0,
    teeboxSR: firstTee?.slopeRating || 0,
    warning: firstTee
      ? `No teebox with CR=${cr}/SR=${sr} found for '${course.name}'. Using '${firstTee.name}'.`
      : `No teebox found for '${course.name}'.`,
  };
}

export async function matchAllCourses(
  parsedRounds: IParsedRound[],
  courses: ICourse[]
): Promise<ICourseMatchResult[]> {
  return Promise.all(
    parsedRounds.map((pr) => matchCourse(pr.roundCourse, pr.roundCR, pr.roundSR, courses))
  );
}
