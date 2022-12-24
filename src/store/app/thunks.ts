import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { RootState } from '../store';
import { loadComments } from '../../helpers';
import { AuthSliceValues, CommentsSliceValues, NewCommentProps } from '../../types';
import { addReply, deleteComment, editComment, setComments } from '.';

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
		const comments = await loadComments();
		dispatch(setComments(comments));
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

export const startCreatingReply = (dbid: string, idToReply: number, content: string) => {
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
		const commentToReply = comments.find((comment) => comment.id === idToReply);
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		console.log(commentToReply);
		dispatch(addReply({ id: idToReply, content }));
		await setDoc(
			docRef,
			{
				...commentToReply,
				replies: [
					{
						content,
						user: {
							image: '',
							username: '',
						},

					},
				],
			},
			{ merge: true }
		);
	};
};
