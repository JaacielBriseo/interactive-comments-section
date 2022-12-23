import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes';
import { CommentsRoutes } from '../comments/routes/CommentsRoutes';

export const AppRouter = () => (
	<Routes>
		<Route path='/*' element={<CommentsRoutes />} />
		<Route path='/auth/*' element={<AuthRoutes />} />
	</Routes>
);
