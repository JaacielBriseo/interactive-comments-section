import { useState } from 'react';
import Swal from 'sweetalert2';
import { FooterItem } from '.';
export const CardFooter = ({ score, user }: { score: number; user?: boolean }) => {
	const [counter, setCounter] = useState(score);
	const alertDelete = () => {
		Swal.fire({
			title: 'Delete Comment',
			text: 'Are you sure you want to delete this comment? This will remove the comment and cannot be undo',
			icon: 'warning',
			showDenyButton: true,
			confirmButtonText: 'Yes, Delete',
			denyButtonText: `Cancel`,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Comment Deleted');
			}
		});
	};
	const plusClick = () => {
		setCounter(counter + 1);
	};
	const minusClick = () => {
		setCounter(counter - 1);
	};

	return (
		<div className='flex justify-between '>
			<div className='flex items-center p-1 justify-between bg-VeryLightGray w-20 h-8'>
				<FooterItem icon='icon-plus' function={plusClick} />
				<p className='text-Moderateblue font-medium'>{counter}</p>
				<FooterItem icon='icon-minus' function={minusClick} />
			</div>
			{user ? (
				<div className='flex items-center space-x-2'>
					<FooterItem function={alertDelete} icon='icon-delete' color='text-SoftRed' text='Delete' />
					<FooterItem icon='icon-edit' color='text-Moderateblue' text='Edit' />
				</div>
			) : (
				<FooterItem color='text-Moderateblue' icon='icon-reply' text='Reply' />
			)}
		</div>
	);
};
