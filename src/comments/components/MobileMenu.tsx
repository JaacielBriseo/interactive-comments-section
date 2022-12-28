import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { LogoutButton } from '.';

export const MobileMenu = () => {
	const { displayName } = useAppSelector((state) => state.auth);
	return (
		<section className='absolute top-0 bottom-0 left-0 flex flex-col items-center w-full min-h-20 py-1 pt-40 space-y-3 text-lg text-Moderateblue bg-opacity-75 bg-black md:hidden'>
			<h1 className='underline font-bold'>Welcome: </h1>
			<span className='font-medium'>{displayName}</span>
			<NavLink to={'userprofile'} className='text-SoftRed'>
				My Profile
			</NavLink>
			<LogoutButton />
		</section>
	);
};
