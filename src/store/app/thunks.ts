import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { AuthSliceValues, CommentsSliceValues } from '../../types';
import { deleteComment, editComment } from './commentsSlice';
import { RootState } from '../store';
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
		await setDoc(newDoc, newComment);
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
export const startUpdatingComment = (content: string, dbid: string, id: number) => {
	return async (
		dispatch: ThunkDispatch<
			{
				comments: CommentsSliceValues;
				auth: AuthSliceValues;
			},
			undefined,
			AnyAction
		> &
			Dispatch<AnyAction>,
		getState: () => RootState
	) => {
		const { comments } = getState().comments;
		const commentToUpdate = comments.find((comment) => comment.dbid === dbid);
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		dispatch(editComment({ id, content }));
		await setDoc(docRef, { ...commentToUpdate, content }, { merge: true });
	};
};
