import { useAppDispatch, startLogout } from '../../store';

export const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const onLogout = () => {
		dispatch(startLogout());
	};
	return (
		<div>
			<button
				onClick={onLogout}
				className='self-start text-SoftRed cursor-pointer'
			>
				Logout
			</button>
		</div>
	);
};
