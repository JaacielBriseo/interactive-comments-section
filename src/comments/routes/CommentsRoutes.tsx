import { Navigate, Route, Routes } from 'react-router-dom';
import { CommentsFromPeople, UserProfile } from '../pages';

export const CommentsRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<CommentsFromPeople />} />
			<Route path='/userprofile' element={<UserProfile />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
