import { createSlice } from '@reduxjs/toolkit';
import { CommentsSliceValues } from '../../types';
import data from '../../data/data.json';

const initialValues: CommentsSliceValues = { ...data };
export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialValues,
	reducers: {
		addComment: (state: CommentsSliceValues, { payload }) => {
			state.comments.push(payload)
		},
	},
});

// Action creators are generated for each case reducer function
export const { addComment } = commentsSlice.actions;
