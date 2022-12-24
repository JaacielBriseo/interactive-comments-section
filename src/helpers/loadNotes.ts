import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';

export const loadNotes = async () => {
	const collectionRef = collection(FirebaseDB, `/comments`);
	const docs = await getDocs(collectionRef);
    docs.forEach(doc => {
        console.log(doc.data());
    });
	
};
