import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { AuthSliceValues, CommentsSliceValues } from '../../types';
import { deleteComment, editComment } from './commentsSlice';
interface NewCommentProps {
	[x: string]: any;
}
export const startNewComment = ({ content, createdAt, id, replies, score, user }: NewCommentProps) => {
	return async (
		dispatch: ThunkDispatch<
			{
				comments: CommentsSliceValues;
				auth: AuthSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>
	) => {
		const newComment = { content, createdAt, id, replies, score, user };
		const newDoc = doc(collection(FirebaseDB, `/comments`));
		const setDocResp = await setDoc(newDoc, newComment);
		console.log({ newDoc, setDocResp });
	};
};

export const startDeletingComment = (id: number, dbid: string) => {
	return async (
		dispatch: ThunkDispatch<
			{
				comments: CommentsSliceValues;
				auth: AuthSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>
	) => {
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		await deleteDoc(docRef);

		dispatch(deleteComment(id));
	};
};
export const startUpdatingComment = (content: any, dbid: string, id: number) => {
	return async (
		dispatch: ThunkDispatch<
			{
				comments: CommentsSliceValues;
				auth: AuthSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>
	,getState:any) => {
		const {comments} = getState().comments
		const commentToUpdate = comments.find((comment:any)=> comment.dbid === dbid)
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		dispatch(editComment({ id, content }));
		await setDoc(docRef, {...commentToUpdate,content}, { merge: true });
	};
};
