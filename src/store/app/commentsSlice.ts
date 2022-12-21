import { createSlice } from '@reduxjs/toolkit';
import { CommentsSliceValues } from '../../types';
import data from '../../data/data.json';

const initialValues: CommentsSliceValues = { ...data };
console.log(data);
export const commentsSlice = createSlice({
	name: 'comments',
	initialState: initialValues,
	reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = commentsSlice.actions;
