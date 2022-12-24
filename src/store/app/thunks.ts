import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { CommentsSliceValues } from '../../types';
import { addComment } from './commentsSlice';
interface NewCommentProps {
	[x: string]: any;
}
export const startNewComment = ({ content, createdAt, id, replies, score, user }: NewCommentProps) => {
	return async (
		dispatch: ThunkDispatch<
			{
				comments: CommentsSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>
	) => {
		const newComment = { content, createdAt, id, replies, score, user };
		// dispatch(
		// 	addComment({
		// 		content,
		// 		createdAt,
		// 		id,
		// 		replies,
		// 		score,
		// 		user,
		// 	})
		// );
		const newDoc = doc(collection(FirebaseDB, `/comments`));
		const setDocResp = await setDoc(newDoc, newComment);
		console.log({ newDoc, setDocResp });
	};
};
