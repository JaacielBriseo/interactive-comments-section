import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store';

export const UserProfile = () => {
	const { displayName, email, photoURL } = useAppSelector((state) => state.auth);

	return (
		<div className='w-full h-screen flex items-center justify-center text-center text-2xl'>
			<NavLink to={'/'} className='absolute left-5 top-5 underline underline-offset-4'>
				Go back
			</NavLink>
			<section className='w-full -mt-20 space-y-5 md:w-1/3'>
				<div className='flex font-bold justify-center mt-6'>
					<img className='h-20 w-20 mb-3' src={photoURL ? photoURL : ''} alt='' />
				</div>
				<h2 className='text-SoftRed'>User</h2>
				<span className='text-Moderateblue'>{displayName}</span>
				<h5 className='text-SoftRed'>Email</h5>
				<span className='text-Moderateblue'>{email}</span>
			</section>
		</div>
	);
};
