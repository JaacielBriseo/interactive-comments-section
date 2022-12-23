import { checkingCredentials, login } from './authSlice';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthSliceValues } from '../../types';

export const checkingAuth = () => {
	return async (
		dispatch: ThunkDispatch<
			{
				auth: AuthSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>
	) => {
		dispatch(checkingCredentials());
	};
};

export const startLoginWithEmail = ({ email, password }: { email: string; password: string }) => {
	return async (
		dispatch: ThunkDispatch<
			{
				auth: AuthSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>
	) => {
		dispatch(checkingCredentials());
		dispatch(login({ email, password }));
	};
};
