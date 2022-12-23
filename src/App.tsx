import { AddComment, CommentsFromPeople } from './components';

export const App = () => {
	return (
		<div className='py-5 font-Rubik'>
			<CommentsFromPeople />
			<AddComment />
		</div>
	);
};
