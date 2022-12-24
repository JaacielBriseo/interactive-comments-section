import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


export const loadComments = async () => {
	const collectionRef = collection(FirebaseDB,`/comments`);
	const docs = await getDocs(collectionRef);
	const comments: any = [];
	docs.forEach((doc) => {
		comments.push({ ...doc.data(), dbid:doc.id });
	});
	console.log(comments);
	return comments;
};
