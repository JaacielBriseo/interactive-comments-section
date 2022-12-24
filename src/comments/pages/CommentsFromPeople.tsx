import { CommentCardLayout } from '../../layout';
import { useAppSelector } from '../../store';
import { AddComment, CardContent, CardFooter, CardHeader, LogoutButton } from '../components';

export const CommentsFromPeople = () => {
	const { comments, currentUser } = useAppSelector((state) => state.comments);

	return (
		<>
			<LogoutButton />
			{[...comments]
				.sort((commentA, commentB) => commentA.id - commentB.id)
				.map((comment) => {
					const isUserComment = comment.user.username === currentUser.username;
					return (
						<div key={comment.id}>
							<CommentCardLayout key={comment.id} className='mainCommentCard'>
								<CardHeader
									img={isUserComment ? currentUser.image!.toString() : comment.user.image}
									createdAt={comment.createdAt}
									username={comment.user.username}
									isUserComment={isUserComment}
								/>
								<CardContent content={comment.content} />
								<CardFooter score={comment.score} user={isUserComment} id={comment.id} dbid={comment.dbid} />
							</CommentCardLayout>
							{comment.replies?.length !== 0 &&
								comment.replies.map((replie) => {
									return (
										<CommentCardLayout key={replie.id} className='replyCommentCard'>
											<CardHeader
												createdAt={replie.createdAt}
												img={replie.user.image}
												username={replie.user.username}
												isUserComment={isUserComment}
											/>
											<CardContent content={replie.content} />
											<CardFooter score={replie.score} id={replie.id} dbid={comment.dbid} user={isUserComment} />
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
