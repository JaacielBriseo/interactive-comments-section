import { checkingCredentials, login, logout } from './';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthSliceValues } from '../../types';
import { signInWithGoogle } from '../../firebase/providers';
import { setUser } from '../app';

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

export const startGoogleSignIn = () => {
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
		const result = await signInWithGoogle();
		if (!result.ok) return dispatch(logout(result.errorMessage));

		dispatch(login(result));
		dispatch(setUser({ username: result.displayName, image: result.photoURL }));
	};
};
