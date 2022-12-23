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
		editComment: (state: CommentsSliceValues, { payload }) => {},
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
