import { useState } from 'react';

export const useLikesCounter = (score:number) => {
	const [counter, setCounter] = useState(score);

	
	const plusClick = () => {
		setCounter(counter + 1);
	};
	const minusClick = () => {
		setCounter(counter - 1);
	};
	
	return {
		plusClick,
		minusClick,
		counter,
	};
};
