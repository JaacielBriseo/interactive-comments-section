import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { CommentsFromPeople } from '../pages';

export const CommentsRoutes = () => {
	const dispatch = useAppDispatch();

	// useLayoutEffect(() => {
	// 	dispatch(startLoadingComments());
	// }, []);

	return (
		<Routes>
			<Route path='/' element={<CommentsFromPeople />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
