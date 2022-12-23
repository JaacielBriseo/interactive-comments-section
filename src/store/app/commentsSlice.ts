import { createSlice } from '@reduxjs/toolkit';
import { CommentsSliceValues } from '../../types';
import data from '../../data/data.json';

const initialValues: CommentsSliceValues = { ...data };
export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialValues,
	reducers: {
		addComment: (state: CommentsSliceValues, { payload }) => {
			state.comments.push(payload);
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
	},
});

// Action creators are generated for each case reducer function
export const { addComment, editComment, deleteComment } = commentsSlice.actions;
