import { checkingCredentials, login, logout } from './';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthSliceValues, CreatingUserProps } from '../../types';
import {
	loginWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	signInWithGoogle,
} from '../../firebase/providers';
import { setUser, toggleMobileMenu } from '../app';

export const checkingAuth = () => {
	return async (dispatch: ThunkDispatch<{ auth: AuthSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>) => {
		dispatch(checkingCredentials());
	};
};

export const startLoginWithEmail = ({ email, password }: { email: string; password: string }) => {
	return async (dispatch: ThunkDispatch<{ auth: AuthSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>) => {
		dispatch(checkingCredentials());
		const result = await loginWithEmailPassword({ email, password });
		if (!result.ok) return dispatch(logout(result.errorMessage));
		dispatch(login(result));
		dispatch(
			setUser({
				username: result.displayName,
				image: !result.photoURL ? '/images/avatars/profile.png' : result.photoURL,
			})
		);
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch: ThunkDispatch<{ auth: AuthSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>) => {
		dispatch(checkingCredentials());
		const result = await signInWithGoogle();
		if (!result.ok) return dispatch(logout(result.errorMessage));

		dispatch(login(result));
		dispatch(setUser({ username: result.displayName, image: result.photoURL }));
	};
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }: CreatingUserProps) => {
	return async (dispatch: ThunkDispatch<{ auth: AuthSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>) => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ password, displayName, email });
		if (!ok) return dispatch(logout(errorMessage));
		dispatch(setUser({ username: displayName, image: !photoURL ? '/images/avatars/profile.png' : photoURL }));
		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLogout = () => {
	return async (dispatch: ThunkDispatch<{ auth: AuthSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>) => {
		await logoutFirebase();
		dispatch(setUser({}));
		dispatch(toggleMobileMenu());
		dispatch(logout(null));
	};
};
