import { useState } from 'react';
import { addComment } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
export const AddComment = () => {
	const dispatch = useAppDispatch();
	const { comments, currentUser } = useAppSelector((state) => state.comments);
	const [comment, setComment] = useState('');
	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(
			addComment({
				content: comment,
				createdAt: new Date().getDate(),
				id: comments.length + 1,
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
	return (
		<form onSubmit={onSubmit} className='bg-White w-80 mx-auto p-3 rounded-lg space-y-4'>
			<div className='flex justify-center'>
				<textarea
					name='comment'
					cols={30}
					rows={5}
					className='border'
					placeholder='Add a comment'
					value={comment}
					onChange={onInputChange}
				></textarea>
			</div>
			<div className='flex justify-between items-center w-11/12'>
				<img src='./images/avatars/image-juliusomo.png' alt='' className='w-8 h-8' />
				<button type='submit' className='bg-Moderateblue w-24 h-12 rounded-lg text-White font-bold'>
					SEND
				</button>
			</div>
		</form>
	);
};
