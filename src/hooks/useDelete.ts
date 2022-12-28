import Swal from 'sweetalert2';
import { startDeletingComment } from '../store';
import { useAppDispatch } from '../store/hooks';
interface DeleteProps {
	id: string;
	dbid: string;
	isReply: boolean;
}
export const useDelete = ({ id, dbid, isReply }: DeleteProps) => {
	const dispatch = useAppDispatch();
	const onDelete = () => {
		Swal.fire({
			title: 'Delete Comment',
			text: 'Are you sure you want to delete this comment? This will remove the comment and cannot be undone.',
			icon: 'warning',
			showDenyButton: true,
			confirmButtonText: 'Yes, Delete',
			denyButtonText: 'Cancel',
			confirmButtonColor: 'hsl(358, 79%, 66%)',
			denyButtonColor: 'hsl(211, 10%, 45%)',
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire('Comment Deleted');
			  dispatch(startDeletingComment(id, dbid, isReply));
			}
		  });
	};
	return { onDelete };
};
