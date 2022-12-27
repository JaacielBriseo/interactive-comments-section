import { Navigate, Route, Routes } from 'react-router-dom';
import { CommentsFromPeople } from '../pages';

export const CommentsRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<CommentsFromPeople />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
