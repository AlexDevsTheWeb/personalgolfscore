export interface ICourse {
	id: string;
	name: string;
	city: string;
	country: string;
	address?: string;
	zip?: string;
	phone?: string;
	email?: string;
	website?: string;
	holes: 9 | 18;
	status: 'Active' | 'Inactive';
	teeboxes: ITeebox[];
	notes?: string;
	createdAt?: number;
	updatedAt?: number;
}

export interface ITeebox {
	name: string;
	color: string;
	gender: 'M' | 'F' | 'mixed';
	par: number;
	courseRating: number;
	slopeRating: number;
	length: number;
}

export type CourseStatus = 'Active' | 'Inactive';
