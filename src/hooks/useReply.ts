import Swal from 'sweetalert2';
import { startCreatingReply, useAppDispatch, useAppSelector } from '../store';

export const useReply = ({ dbid }: { dbid: string; id: string }) => {
	const dispatch = useAppDispatch();
	const { comments } = useAppSelector((state) => state.comments);
	const onReply = () => {
		Swal.fire({
			input: 'textarea',
			inputLabel: 'Reply',
			inputPlaceholder: 'Type your reply here...',
			showCancelButton: true,
		}).then((result) => {
			if (!result.isConfirmed || result.value === '') return;
			const findUserToReply = comments.find((comment) => comment.dbid === dbid);
			const userToReply = findUserToReply?.user.username;
			const reply = result.value;
			dispatch(startCreatingReply(dbid, reply, userToReply!));
		});
	};
	return { onReply };
};
