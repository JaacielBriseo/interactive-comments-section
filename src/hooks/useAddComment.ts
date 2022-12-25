import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { startNewComment, useAppDispatch, useAppSelector } from '../store';

export const useAddComment = () => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppSelector((state) => state.comments);
	const [comment, setComment] = useState('');
	const onAddComment = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(
			startNewComment({
				content: comment,
				createdAt: new Date().toString(),
				timestamp: new Date().getTime(),
				id: uuidv4(),
				replies: [],
				score: 0,
				user: {
					image: currentUser.image,
					username: currentUser.username,
				},
			})
		);
	};
	const onInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setComment(e.target.value);
	};
	return { onAddComment, onInputChange, currentUser, comment };
};
