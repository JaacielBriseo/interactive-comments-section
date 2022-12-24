import { createSlice } from '@reduxjs/toolkit';
import { CommentsSliceValues } from '../../types';

const initialValues: CommentsSliceValues = {
	comments: [
		{
			content: '',
			createdAt: '',
			id: 0,
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
};

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialValues,
	reducers: {
		addComment: (state: CommentsSliceValues, { payload }) => {
			state.comments.push(payload);
		},
		addReply: (state: CommentsSliceValues, { payload }) => {
			const { id, content } = payload;
			const comment = state.comments.find((comment) => comment.id === id);
			if (comment) {
				comment.replies.push({
					content,
					createdAt: '1 minute ago',
					id,
					replyingTo: '',
					score: 0,
					user: {
						image: '',
						username: '',
					},
				});
			} else {
				state.comments.forEach((comment) => {
					const reply = comment.replies.find((reply) => reply.id === id);
					if (reply) {
						reply.replies?.push({
							content,
							createdAt: '1 minute ago',
							id,
							replyingTo: '',
							score: 0,
							user: {
								image: '',
								username: '',
							},
						});
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
export const { addComment, addReply, editComment, deleteComment, setUser, setComments } = commentsSlice.actions;
