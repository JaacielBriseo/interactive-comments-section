import { toggleMobileMenu, useAppDispatch, useAppSelector } from '../../store';
export const HamburgerButton = () => {
	const dispatch = useAppDispatch();
	const { isMobileMenuOpen } = useAppSelector((state) => state.comments);
	return (
		<div className='m-4 flex justify-end'>
			<button
				onClick={() => dispatch(toggleMobileMenu())}
				type='button'
				className={`${isMobileMenuOpen ? 'open' : ''} z-40 block hamburger md:hidden focus:outline-none`}
			>
				<span className={`hamburger-top ${isMobileMenuOpen && 'open'}`}></span>
				<span className={`hamburger-middle ${isMobileMenuOpen && 'open'}`}></span>
				<span className={`hamburger-bottom ${isMobileMenuOpen && 'open'}`}></span>
			</button>
		</div>
	);
};
