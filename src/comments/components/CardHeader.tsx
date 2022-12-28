import { CardHeaderProps } from '../../types';

export const CardHeader = ({ img, username, createdAt, isUserComment }: CardHeaderProps) => {
	return (
		<header
			className={`flex justify-between items-center gap-4 w-[247px] h-8 md:w-full lg:mt-2 ${
				isUserComment && 'w-[263px]'
			}`}
		>
			<img src={img} alt='' className='w-8 h-8 rounded-full lg:w-12 lg:h-12' />
			<h1 className='text-DarkBlue font-bold text-sm md:text-base lg:text-lg'>{username}</h1>
			{isUserComment && (
				<small className='p-[2px] rounded-lg text-center text-White bg-Moderateblue md:p-1 lg:p-2 lg:text-sm'>
					you
				</small>
			)}
			<p className='text-GrayishBlue text-xs md:text-sm lg:text-base'>{createdAt.substring(0, 10)}</p>
		</header>
	);
};
