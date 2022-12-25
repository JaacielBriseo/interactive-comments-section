import { useState } from 'react';
import Swal from 'sweetalert2';
import { startCreatingReply, startDeletingComment, startUpdatingComment, useAppDispatch } from '../store';

interface CrudProps {
	score: number;
	id: string;
	dbid: string;
}
export const useCrudActions = ( {score, id, dbid }: CrudProps) => {
	const [counter, setCounter] = useState(score);
	const dispatch = useAppDispatch();

	const onDelete = () => {
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
				dispatch(startDeletingComment(id, dbid));
			}
		});
	};

	const onEditComment = () => {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Message',
			inputPlaceholder: 'Type your message here...',
			showCancelButton: true,
		}).then((result) => {
			if (!result.isConfirmed || result.value === '') return;
			const content = result.value;
			dispatch(startUpdatingComment(content, dbid, id));
		});
	};
	const plusClick = () => {
		setCounter(counter + 1);
	};
	const minusClick = () => {
		setCounter(counter - 1);
	};
	const onReply = () => {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Reply',
			inputPlaceholder: 'Type your reply here...',
			showCancelButton: true,
		}).then((result) => {
			if (!result.isConfirmed || result.value === '') return;
			const reply = result.value;
			dispatch(startCreatingReply(dbid, id, reply));
		});
	};
	return {
		plusClick,
		minusClick,
		onReply,
		onDelete,
		onEditComment,
        counter
	};
};
