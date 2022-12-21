import { AddComment, CommentsFromPeople } from './components';

export const App = () => {
	return (
		<div className='py-10 font-Rubik'>
			<CommentsFromPeople />
			<AddComment />
		</div>
	);
};
