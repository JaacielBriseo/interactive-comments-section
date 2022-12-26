import { CardHeaderProps } from '../../types';

export const CardHeader = ({ img, username, createdAt, isUserComment }: CardHeaderProps) => {
	return (
		<div className={`flex justify-between items-center gap-4 w-[247px] h-8 ${isUserComment && 'w-[263px]'}`}>
			<img src={img} alt='' className='w-8 h-8 rounded-full' />
			<h1 className='text-DarkBlue font-bold text-sm'>{username}</h1>
			{isUserComment && <small className='p-[2px] rounded-lg text-center text-White bg-Moderateblue'>you</small>}
			<p className='text-GrayishBlue text-xs'>{createdAt.substring(0, 10)}</p>
		</div>
	);
};
