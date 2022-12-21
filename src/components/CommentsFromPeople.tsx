import { useAppSelector } from '../store';

export const CommentsFromPeople = () => {
	const { comments, currentUser } = useAppSelector((state) => state.comments);
	return (
		<>
			{comments.map((comment) => (
				<div
					key={comment.id}
					className='flex flex-col justify-between w-80 max-w-[343px] h-72 mx-auto p-3 bg-White m-5 rounded-lg'
				>
					<div className='flex justify-between items-center w-60'>
						<img src={comment.user.image.png} alt='user' className='w-8 h-8' />
						<h1 className='text-DarkBlue font-bold'>{comment.user.username}</h1>
						<p className='text-GrayishBlue'>{comment.createdAt}</p>
					</div>
					<div className='max-w-[311px] text-GrayishBlue'>
						<p>{comment.content}</p>
					</div>
					<div className='flex justify-between w-72'>
						<div className='flex items-center p-1 justify-between bg-VeryLightGray w-20 h-8'>
							<img src='./assets/icon-plus.svg' alt='plus' className='text-LightGrayishBlue' />
							<p className='text-Moderateblue font-medium'>{comment.score}</p>
							<img src='./assets/icon-minus.svg' alt='minus' className='text-LightGrayishBlue' />
						</div>
						<div className='flex items-center space-x-1 w-14 h-6'>
							<img src='./assets/icon-reply.svg' alt='reply' className='w-4 h-4' />
							<h3 className='text-Moderateblue font-bold'>Reply</h3>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
