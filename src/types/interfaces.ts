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
	id: number;
	dbid:string
	replies: {
		content: string;
		createdAt: string;
		id: number;
		replyingTo: string;
		score: number;
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
		[x: string]: any;
	};
}
export interface CardHeaderProps {
	img: string;
	username: string;
	createdAt: string;
	user?: boolean;
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
