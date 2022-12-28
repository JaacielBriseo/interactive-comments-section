import { useAddComment } from '../../hooks';

export const AddComment = () => {
	const { comment, currentUser, onAddComment, onInputChange } = useAddComment();
	return (
		<form onSubmit={onAddComment} className='bg-White w-80 mx-auto p-3 rounded-lg space-y-4 lg:w-[730px]'>
			<div className='flex flex-col items-center justify-center'>
				<div className='flex justify-center lg:hidden'>
					<textarea
						name='comment'
						cols={30}
						rows={5}
						className='border lg:w-10/12'
						placeholder='Add a comment'
						value={comment}
						onChange={onInputChange}
					></textarea>
				</div>
				<div className='flex justify-between items-center w-11/12 lg:items-start'>
					<img src={currentUser.image} alt='' className='w-8 h-8 rounded-full lg:w-12 lg:h-12' />
					<div className='justify-center hidden lg:flex lg:w-10/12'>
						<textarea
							name='comment'
							cols={30}
							rows={5}
							className='border lg:w-10/12'
							placeholder='Add a comment'
							value={comment}
							onChange={onInputChange}
						></textarea>
					</div>
					<button type='submit' className='bg-Moderateblue md:mt-3 w-24 h-12 rounded-lg text-White font-bold lg:w-32 lg:h-14'>
						SEND
					</button>
				</div>
			</div>
		</form>
	);
};
