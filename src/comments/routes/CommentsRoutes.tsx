import { useEffect, useLayoutEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, startLoadingComments, useAppSelector } from '../../store';
import { CommentsFromPeople } from '../pages';

export const CommentsRoutes = () => {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		dispatch(startLoadingComments());
		console.log('me renderie');
	}, []);

	return (
		<Routes>
			<Route path='/' element={<CommentsFromPeople />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
