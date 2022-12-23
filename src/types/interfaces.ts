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
	replies: {
		content: string;
		createdAt: string;
		id: number;
		replyingTo: string;
		score: number;
		user: {
			image: {
				png: string;
				webp: string;
			};
			username: string;
		};
	}[];
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
		image:
			| null
			| string
			| {
					png: string;
					webp: string;
			  };
		username: string;
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
