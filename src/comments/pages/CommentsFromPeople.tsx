import { CommentCardLayout } from '../../layout';
import { useAppSelector } from '../../store';
import { AddComment, CardContent, CardFooter, CardHeader, HamburgerButton, LogoutButton, Menu } from '../components';

export const CommentsFromPeople = () => {
	const { comments, currentUser,isMobileMenuOpen } = useAppSelector((state) => state.comments);
	return (
		<>
			<HamburgerButton/>
			{isMobileMenuOpen && <Menu/>}
			{[...comments]
				.sort((commentA, commentB) => commentA.timestamp - commentB.timestamp)
				.map((comment) => {
					const isUserComment = comment.user.username === currentUser.username;
					return (
						<div key={comment.id}>
							<CommentCardLayout key={comment.id} className='mainCommentCard'>
								<CardHeader
									img={isUserComment ? currentUser.image : comment.user.image}
									createdAt={comment.createdAt}
									username={comment.user.username}
									isUserComment={isUserComment}
								/>
								<CardContent content={comment.content} />
								<CardFooter
									score={comment.score}
									isUser={isUserComment}
									id={comment.id}
									dbid={comment.dbid}
									isReply={false}
								/>
							</CommentCardLayout>
							{comment.replies?.length !== 0 &&
								comment.replies.map((replie) => {
									const isUserReply = replie.user.username === currentUser.username;
									return (
										<CommentCardLayout key={replie.id} className='replyCommentCard'>
											<CardHeader
												createdAt={replie.createdAt}
												img={replie.user.image}
												username={replie.user.username}
												isUserComment={isUserReply}
											/>
											<CardContent content={replie.content} />
											<CardFooter
												score={replie.score}
												id={replie.id}
												dbid={comment.dbid}
												isUser={isUserReply}
												isReply
											/>
										</CommentCardLayout>
									);
								})}
						</div>
					);
				})}
			<AddComment />
		</>
	);
};
