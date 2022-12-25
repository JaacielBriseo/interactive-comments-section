import Swal from 'sweetalert2';
import { startCreatingReply } from '../store';
import { useAppDispatch } from '../store/hooks';

export const useReply = ({ dbid, id }: { dbid: string; id: string }) => {
	const dispatch = useAppDispatch();
	const onReply = () => {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Reply',
			inputPlaceholder: 'Type your reply here...',
			showCancelButton: true,
		}).then((result) => {
			if (!result.isConfirmed || result.value === '') return;
			const reply = result.value;
			dispatch(startCreatingReply(dbid, reply));
		});
	};
	return { onReply };
};
