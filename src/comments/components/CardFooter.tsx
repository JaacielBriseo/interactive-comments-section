import { FooterItem } from '.';
import { useCrudActions } from '../../hooks/useCrudActions';
interface CardFooterProps {
	score: number;
	isUser?: boolean;
	id: string;
	dbid: string;
}
export const CardFooter = ({ score, isUser, id, dbid }: CardFooterProps) => {
	const { minusClick, onDelete, onEditComment, onReply, plusClick, counter } = useCrudActions({ score, id, dbid });
	return (
		<div className='flex justify-between '>
			<div className='flex items-center p-1 justify-between bg-VeryLightGray w-20 h-8'>
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
		</div>
	);
};
