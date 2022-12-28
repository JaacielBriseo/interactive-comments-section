import { useState } from 'react';
import { setLikesCounter, useAppDispatch, startUpdatingLikes } from '../store';

export const useLikesCounter = (score: number, dbid: string, id: string, isReply: boolean) => {
	const [counter, setCounter] = useState(score);

	const dispatch = useAppDispatch();
	const plusClick = () => {
		setCounter((prevCounter) => {
			const newCounter = prevCounter + 1;
			dispatch(startUpdatingLikes(newCounter, dbid, id, isReply));
			dispatch(setLikesCounter({ id, counter: newCounter }));
			return newCounter;
		});
	};
	const minusClick = () => {
		setCounter((prevCounter) => {
			const newCounter = prevCounter - 1;
			dispatch(startUpdatingLikes(newCounter, dbid, id, isReply));
			dispatch(setLikesCounter({ id, counter: newCounter }));
			return newCounter;
		});
	};

	return {
		plusClick,
		minusClick,
		counter,
	};
};
