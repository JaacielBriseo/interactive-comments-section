import { useAppDispatch, startLogout } from '../../store';

export const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const onLogout = () => {
		dispatch(startLogout());
	};
	return (
		<button
			onClick={onLogout}
			className='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'
		>
			Logout
		</button>
	);
};
