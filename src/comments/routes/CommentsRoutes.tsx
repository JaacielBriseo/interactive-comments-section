import { Navigate, Route, Routes } from 'react-router-dom';
import { CommentsFromPeople } from '../pages';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useLayoutEffect } from 'react';
import { startLoadingComments } from '../../store/auth/thunks';

export const CommentsRoutes = () => {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		dispatch(startLoadingComments());
	}, []);

	return (
		<Routes>
			<Route path='/' element={<CommentsFromPeople />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
