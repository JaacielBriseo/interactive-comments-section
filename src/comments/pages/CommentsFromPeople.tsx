import { CommentCardLayout } from '../../layout';
import { useAppSelector } from '../../store';
import { AddComment, CardContent, CardFooter, CardHeader, LogoutButton } from '../components';

export const CommentsFromPeople = () => {
	const { comments, currentUser } = useAppSelector((state) => state.comments);
	return (
		<>
		<LogoutButton/>
			{comments.map((comment) => (
				<div key={comment.id}>
					<CommentCardLayout className='mainCommentCard'>
						<CardHeader
							img={
								comment.user.username === currentUser.username ? currentUser.image!.toString() : comment.user.image.png
							}
							createdAt={comment.createdAt}
							username={comment.user.username}
							user={currentUser.username === comment.user.username}
						/>
						<CardContent content={comment.content} />
						<CardFooter score={comment.score} user={currentUser.username === comment.user.username} id={comment.id}/>
					</CommentCardLayout>
					{comment.replies?.length !== 0 ? (
						<>
							{comment.replies.map((replie) =>
								replie.user.username === currentUser.username ? (
									<CommentCardLayout key={replie.createdAt} className='replyCommentCard'>
										<CardHeader
											createdAt={replie.createdAt}
											img={replie.user.image.png}
											username={replie.user.username}
											user
										/>
										<CardContent content={replie.content} />
										<CardFooter score={replie.score} user id={replie.id} />
									</CommentCardLayout>
								) : (
									<CommentCardLayout key={replie.createdAt} className='replyCommentCard'>
										<CardHeader
											createdAt={replie.createdAt}
											img={replie.user.image.png}
											username={replie.user.username}
										/>
										<CardContent content={replie.content} />
										<CardFooter score={replie.score} />
									</CommentCardLayout>
								)
							)}
						</>
					) : (
						<></>
					)}
				</div>
			))}
			<AddComment />
		</>
	);
};
