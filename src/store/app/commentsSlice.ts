import { createSlice } from '@reduxjs/toolkit';
import { CommentsSliceValues } from '../../types';
const initialValues: CommentsSliceValues = {
	comments: [
		{
			content: '',
			createdAt: '',
			timestamp: 0,
			id: '',
			replies: [],
			score: 0,
			user: {
				image: '',
				username: '',
			},
			dbid: '',
		},
	],
	currentUser: {
		username: '',
		image: '',
	},
	isMobileMenuOpen: false,
};

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialValues,
	reducers: {
		toggleMobileMenu: (state: CommentsSliceValues) => {
			state.isMobileMenuOpen = !state.isMobileMenuOpen;
		},
		addComment: (state: CommentsSliceValues, { payload }) => {
			state.comments.push(payload);
		},

		addReply: (state: CommentsSliceValues, { payload }) => {
			const comment = state.comments.find((comment) => comment.id === payload.id);
			if (comment) {
				comment.replies.push(payload);
			} else {
				state.comments.forEach((comment) => {
					const reply = comment.replies.find((reply) => reply.id === payload.id);
					if (reply) {
						reply.replies?.push(payload);
					}
				});
			}
		},

		editComment: (state: CommentsSliceValues, { payload }) => {
			const { id, content } = payload;
			const comment = state.comments.find((comment) => comment.id === id);
			if (comment) {
				comment.content = content;
			} else {
				state.comments.forEach((comment) => {
					const reply = comment.replies.find((reply) => reply.id === id);
					if (reply) {
						reply.content = content;
					}
				});
			}
		},

		deleteComment: (state: CommentsSliceValues, { payload }) => {
			const id = payload;
			state.comments = state.comments.filter((comment) => comment.id !== id);
			state.comments.forEach((comment) => {
				comment.replies = comment.replies.filter((reply) => reply.id !== id);
			});
		},

		setUser: (state: CommentsSliceValues, { payload }) => {
			state.currentUser.username = payload.username;
			state.currentUser.image = payload.image;
		},

		setComments: (state, { payload }) => {
			state.comments = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addComment, addReply, editComment, deleteComment, setUser, setComments ,toggleMobileMenu} = commentsSlice.actions;
