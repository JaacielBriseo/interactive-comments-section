import { NavLink } from 'react-router-dom';
import { LogoutButton } from '.';
import { useAppSelector } from '../../store';

export const Navbar = () => {
	const { displayName, photoURL } = useAppSelector((state) => state.auth);
	return (
		<nav className='hidden md:flex justify-between items-center w-full h-10 p-5 border-b-2 border-DarkBlue'>
			<div className='flex items-center space-x-3'>
				<img src={photoURL ? photoURL : '/images/avatars/profile.png'} alt='' className='w-8 h-8 rounded-full' />
				<h1 className='text-black'>
					Welcome:<span className='text-Moderateblue font-medium'> {displayName}</span>
				</h1>
			</div>
			<div className='flex space-x-3'>
				<NavLink to='userprofile' className='text-Moderateblue'>
					My profile
				</NavLink>
				<LogoutButton />
			</div>
		</nav>
	);
};
