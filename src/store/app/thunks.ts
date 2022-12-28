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
} from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { RootState } from '../store';
import { CommentsSliceValues, NewCommentProps } from '../../types';
import { addReply, deleteComment } from '.';
import { v4 as uuidv4 } from 'uuid';

export const startNewComment = ({ content, createdAt, id, replies, score, user, timestamp }: NewCommentProps) => {
	return async () => {
		const newComment = { content, createdAt, id, replies, score, user, timestamp };
		const newDoc = doc(collection(FirebaseDB, `/comments`));
		await setDoc(newDoc, newComment);
	};
};

export const startDeletingComment = (id: string, dbid: string, isReply: boolean) => {
	return async (
		dispatch: ThunkDispatch<{ comments: CommentsSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>,
		getState: () => RootState
	) => {
		const { comments } = getState().comments;
		if (!isReply) {
			const docRef = doc(FirebaseDB, `/comments/${dbid}`);
			await deleteDoc(docRef);
			dispatch(deleteComment(id));
		} else {
			const commentIndex = comments.findIndex((comment) => comment.replies.find((reply) => reply.id === id));
			if (commentIndex !== -1) {
				const commentDBID = comments[commentIndex].dbid;
				const docRef = doc(FirebaseDB, `/comments/${commentDBID}`);
				const newReplies = comments[commentIndex].replies.filter((reply) => reply.id !== id);
				await updateDoc(docRef, { replies: newReplies });
			}
		}
	};
};

export const startUpdatingComment = (content: string, dbid: string, id: string, isReply: boolean) => {
	return async (
		dispatch: ThunkDispatch<{ comments: CommentsSliceValues }, undefined, AnyAction> & Dispatch<AnyAction>,
		getState: () => RootState
	) => {
		const { comments } = getState().comments;
		if (!isReply) {
			const docRef = doc(FirebaseDB, `/comments/${dbid}`);
			const commentToUpdate = comments.find((comment) => comment.dbid === dbid);
			await setDoc(docRef, { ...commentToUpdate, content }, { merge: true });
		} else {
			const commentIndex = comments.findIndex((comment) => comment.replies.find((reply) => reply.id === id));
			if (commentIndex !== -1) {
				const commentDBID = comments[commentIndex].dbid;
				const docRef = doc(FirebaseDB, `/comments/${commentDBID}`);
				const repliesSnapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
				const replies: { id: string; content: string }[] = repliesSnapshot.data()?.replies;
				const updatedReplies = replies.map((reply) => {
					if (reply.id === id) {
						return { ...reply, content };
					}
					return reply;
				});
				await updateDoc(docRef, { replies: updatedReplies });
			}
		}
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
			timestamp: new Date().getTime(),
		};
		dispatch(addReply(reply));
		await updateDoc(docRef, {
			replies: arrayUnion(reply),
		});
	};
};
