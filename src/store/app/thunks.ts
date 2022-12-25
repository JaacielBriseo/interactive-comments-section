import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { arrayUnion, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { RootState } from '../store';
import { loadComments } from '../../helpers';
import { AuthSliceValues, CommentsSliceValues, NewCommentProps } from '../../types';
import { addReply, deleteComment, editComment, setComments } from '.';
import { v4 as uuidv4 } from 'uuid';
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

export const startDeletingComment = (id: string, dbid: string) => {
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
export const startUpdatingComment = (content: string, dbid: string, id: string) => {
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

export const startCreatingReply = (dbid: string, idToReply: string, content: string) => {
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
		const { currentUser } = getState().comments;
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		dispatch(addReply({ id: idToReply, content }));
		await updateDoc(docRef, {
			replies: arrayUnion({
				content,
				createdAt: new Date().getDate(),
				user: currentUser,
				id: uuidv4(),
			})
		});
	};
};
