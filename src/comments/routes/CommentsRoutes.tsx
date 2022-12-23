import { Route, Routes } from 'react-router-dom';
import { CommentsFromPeople } from '../pages';

export const CommentsRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<CommentsFromPeople />} />
		</Routes>
	);
};
