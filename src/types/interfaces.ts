export interface AuthSliceValues {
	status: 'checking' | 'authenticated' | 'not-authenticated';
	uid: null | string;
	email: null | string;
	displayName: null | string;
	photoURL: null | string;
	errorMessage: null | string;
}

export interface Comment {
	content: string;
	createdAt: string;
	timestamp: number;
	id: string;
	dbid: string;
	replies: {
		content: string;
		createdAt: string;
		id: string;
		replyingTo: string;
		score: number;
		replies?: {
			[x: string]: any;
		};
		user: {
			image: string;
			username: string;
		};
	}[];
	score: number;
	user: {
		image: string;
		username: string;
	};
}

export interface CommentsSliceValues {
	comments: Comment[];
	currentUser: {
		username: string;
		image: string;
	};
}
type EmptyObject = {};

export type CommentsSlice = EmptyObject | CommentsSliceValues;
export interface CardHeaderProps {
	img: string;
	username: string;
	createdAt: string;
	isUserComment?: boolean;
}
export interface FooterItemProps {
	icon: string;
	color?: string;
	text?: string;
	[x: string]: any;
}
export interface CreatingUserProps {
	email: string;
	password: string;
	displayName: string;
}
export interface NewCommentProps {
	content: string;
	createdAt: string;
	timestamp: number;
	id: string;
	replies: [];
	score: number;
	user: {
		image: string;
		username: string;
	};
}
