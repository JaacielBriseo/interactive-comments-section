import { useEffect } from 'react';
import { FirebaseAuth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout, setUser, useAppDispatch, useAppSelector } from '../store';

export const useCheckAuth = () => {
	const { status } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout(null));
			const { uid, email, displayName, photoURL } = user;
			dispatch(login({ uid, email, displayName, photoURL }));
			dispatch(setUser({ image: photoURL, username: displayName }));
		});
	}, []);
	return status
    
};
