import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import {
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	DocumentData,
	DocumentSnapshot,
	getDoc,
	setDoc,
	updateDoc,
} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { RootState } from '../store';
import { loadComments } from '../../helpers';
import { CommentsSliceValues, NewCommentProps } from '../../types';
import { addReply, deleteComment, setComments } from '.';
import { v4 as uuidv4 } from 'uuid';

export const startNewComment = ({ content, createdAt, id, replies, score, user, timestamp }: NewCommentProps) => {
	return async (
		dispatch: ThunkDispatch<{ comments: CommentsSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>
	) => {
		const newComment = { content, createdAt, id, replies, score, user, timestamp };
		const newDoc = doc(collection(FirebaseDB, `/comments`));
		await setDoc(newDoc, newComment);
		const comments = await loadComments();
		dispatch(setComments(comments));
	};
};

export const startDeletingComment = (id: string, dbid: string, isReply: boolean) => {
	return async (
		dispatch: ThunkDispatch<{ comments: CommentsSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>,
		getState: () => RootState
	) => {
		const { comments } = getState().comments;
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		if (!isReply) {
			await deleteDoc(docRef);
			dispatch(deleteComment(id));
		} else {
			comments.forEach(async (comment) => {
				const newReplies = comment.replies.filter((reply) => reply.id !== id);
				await updateDoc(docRef, { replies: newReplies });
			});
		}
		const newComments = await loadComments();
		dispatch(setComments(newComments));
	};
};
export const startUpdatingComment = (content: string, dbid: string, id: string, isReply: boolean) => {
	return async (
		dispatch: ThunkDispatch<{ comments: CommentsSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>,
		getState: () => RootState
	) => {
		const { comments } = getState().comments;
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		const commentToUpdate = comments.find((comment) => comment.dbid === dbid);
		const repliesSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
		const replies: { id: string; content: string }[] = repliesSnapshot.data()?.replies;
		const updatedReplies = replies.map((reply) => {
			if (reply.id === id) {
				return { ...reply, content };
			}
			return reply;
		});
		if (!isReply) {
			await setDoc(docRef, { ...commentToUpdate, content }, { merge: true });
		} else {
			await updateDoc(docRef, { replies: updatedReplies });
		}
		const newComments = await loadComments();
		dispatch(setComments(newComments));
	};
};

export const startCreatingReply = (dbid: string, content: string) => {
	return async (
		dispatch: ThunkDispatch<{ comments: CommentsSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>,
		getState: () => RootState
	) => {
		const { currentUser } = getState().comments;
		const docRef = doc(FirebaseDB, `/comments/${dbid}`);
		const reply = {
			content,
			createdAt: new Date().toString(),
			id: uuidv4(),
			replyingTo: '',
			score: 0,
			user: currentUser,
		};
		dispatch(addReply(reply));
		await updateDoc(docRef, {
			replies: arrayUnion(reply),
		});
		const comments = await loadComments();
		dispatch(setComments(comments));
	};
};
