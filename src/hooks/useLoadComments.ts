import { collection, onSnapshot, query, QuerySnapshot, DocumentData, orderBy } from 'firebase/firestore';
import { useEffect } from 'react';
import { FirebaseDB } from '../firebase/config';
import { useAppDispatch, setComments } from '../store';

export const useLoadComments = () => {
	const dispatch = useAppDispatch();
	const q = query(collection(FirebaseDB, `/comments`), orderBy('timestamp', 'asc'));
	useEffect(() => {
		const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
			const comments: DocumentData[] = [];
			querySnapshot.forEach((doc) => {
				comments.push({ ...doc.data(), dbid: doc.id });
			});
			dispatch(setComments(comments));
		});
		// eslint-disable-next-line
	}, []);
};
