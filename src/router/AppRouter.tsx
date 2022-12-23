import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes';
import { CommentsRoutes } from '../comments/routes';
import { useAppSelector } from '../store/hooks';

export const AppRouter = () => {
	const { status } = useAppSelector((state) => state.auth);
	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path='/*' element={<CommentsRoutes />} />
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
