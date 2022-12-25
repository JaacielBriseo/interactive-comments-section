import Swal from 'sweetalert2';
import { startUpdatingComment } from '../store';
import { useAppDispatch } from '../store/hooks';
interface EditCommentProps {
	dbid: string;
	id: string;
	isReply:boolean
}
export const useEditComment = ({ dbid, id , isReply }: EditCommentProps) => {
	const dispatch = useAppDispatch();
	const onEditComment = () => {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Message',
			inputPlaceholder: 'Type your message here...',
			showCancelButton: true,
		}).then((result) => {
			if (!result.isConfirmed || result.value === '') return;
			const content = result.value;
			dispatch(startUpdatingComment(content, dbid, id,isReply));
		});
	};
	return {onEditComment};
};
