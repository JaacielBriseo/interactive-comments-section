import { FooterItem } from '.';
import { CardFooterProps } from '../../types';
import { useLikesCounter, useDelete, useEditComment, useReply } from '../../hooks';

export const CardFooter = ({ score, isUser, id, dbid, isReply }: CardFooterProps) => {
	const { minusClick, plusClick, counter } = useLikesCounter(score, dbid, id, isReply);
	const { onEditComment } = useEditComment({ id, dbid, isReply });
	const { onDelete } = useDelete({ isReply, id, dbid });
	const { onReply } = useReply({ dbid, id });
	return (
		<footer className='flex justify-between'>
			<div className='flex items-center justify-between p-1 rounded-md bg-VeryLightGray w-20 h-8'>
				<FooterItem icon='icon-plus' function={plusClick} />
				<p className='text-Moderateblue font-medium'>{counter}</p>
				<FooterItem icon='icon-minus' function={minusClick} />
			</div>
			{isUser ? (
				<div className='flex items-center space-x-2'>
					<FooterItem function={onDelete} icon='icon-delete' color='text-SoftRed' text='Delete' />
					<FooterItem function={onEditComment} icon='icon-edit' color='text-Moderateblue' text='Edit' />
				</div>
			) : (
				<FooterItem function={onReply} color='text-Moderateblue' icon='icon-reply' text='Reply' />
			)}
		</footer>
	);
};
