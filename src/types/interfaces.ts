export interface AuthSliceValues {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	uid: null | string;
	email: null | string;
	displayName: null | string;
	photoURL: null | string;
	errorMessage: null | string;
}

interface Comment {
	content: string;
	createdAt: string;
	id: number;
	replies?: Comment[];
	score: number;
	user: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
}

export interface CommentsSliceValues {
	comments: Comment[];
	currentUser: {
		image: {
			png: string;
			webp: string;
		};
		username: string;
	};
}
