import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceValues } from '../../types';

const initialValues: AuthSliceValues = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState: initialValues,
	reducers: {
		login: (state, { payload }) => {
			state.status = 'authenticated';
			state.displayName = payload.email;
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;
		},
		logout: (state, { payload }) => {
			state.status = 'not-authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = payload;
		},
		checkingCredentials: (state) => {
			state.status = 'checking';
		},
	},
});

// Action creators are generated for each case reducer function
export const { checkingCredentials, logout, login } = authSlice.actions;
