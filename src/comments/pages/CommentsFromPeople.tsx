import { useAppSelector } from '../../store';
import { useLoadComments } from '../../hooks';
import { AddComment, HamburgerButton, MobileMenu, RenderComment } from '../components';

export const CommentsFromPeople = () => {
	const { comments, isMobileMenuOpen } = useAppSelector((state) => state.comments);
	useLoadComments();
	return (
		<>
			<HamburgerButton />
			{isMobileMenuOpen && <MobileMenu />}
			{comments.map((comment) => (
				<div key={comment.id}>
					{<RenderComment comment={comment} isReply={false} />}
					{comment.replies?.length !== 0 &&
						comment.replies.map((replie) => <RenderComment key={replie.id} comment={replie} isReply={true} />)}
				</div>
			))}
			<AddComment />
		</>
	);
};
