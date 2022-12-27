import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		// const credentials = GoogleAuthProvider.credentialFromResult(result);
		const { displayName, email, photoURL, uid } = result.user;
		return {
			ok: true,
			//user info
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error: any) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};
interface registerUserWithEmailPasswordProps {
	email: string;
	password: string;
	displayName: string;
}
export const registerUserWithEmailPassword = async ({
	email,
	password,
	displayName,
}: registerUserWithEmailPasswordProps) => {
	try {
		const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL } = resp.user;
		await updateProfile(FirebaseAuth.currentUser!, {
			displayName,
		});
		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error: any) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const loginWithEmailPassword = async ({ email, password }: { email: string; password: string }) => {
	try {
		const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL, displayName } = resp.user;
		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error: any) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();
