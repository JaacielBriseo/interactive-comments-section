import { CardHeaderProps } from '../../types';

export const CardHeader = ({ img, username, createdAt, isUserComment }: CardHeaderProps) => {
	return (
		<div className={`flex justify-between items-center ${isUserComment ? 'w-full' : 'w-60'}`}>
			<img src={img} alt='user' className='w-8 h-8' />
			<h1 className='text-DarkBlue font-bold'>{username}</h1>
			{isUserComment && <small className='w-8 h-5 rounded-lg text-center text-White bg-Moderateblue'>you</small>}
			<p className='text-GrayishBlue'>{createdAt}</p>
		</div>
	);
};
