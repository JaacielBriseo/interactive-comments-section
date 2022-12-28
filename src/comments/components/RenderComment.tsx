import { Comment, Replies } from '../../types';
import { useAppSelector } from '../../store';
import { CommentCardLayout } from '../../layout';
import { CardContent, CardFooter, CardHeader } from '.';

export const RenderComment = ({ comment, isReply }: { comment: Comment | Replies; isReply: boolean }) => {
	const { currentUser } = useAppSelector((state) => state.comments);
	const isUserComment = comment.user.username === currentUser.username;
	return (
		<CommentCardLayout className={`${isReply ? 'reply' : 'main'}CommentCard`}>
			<CardHeader
				img={isUserComment ? currentUser.image : comment.user.image}
				createdAt={comment.createdAt}
				username={comment.user.username}
				isUserComment={isUserComment}
			/>
			<CardContent content={comment.content} replyingTo={isReply ? comment.user.username : undefined} />
			<CardFooter score={comment.score} isUser={isUserComment} id={comment.id} dbid={comment.dbid} isReply={isReply} />
		</CommentCardLayout>
	);
};
