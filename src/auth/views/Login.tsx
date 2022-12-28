import { NavLink } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { InputField } from '../components';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
	const { validationSchema, onGoogleClick, startLogin } = useLogin();
	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				startLogin(values);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, errors, touched }) => (
				<div className='w-full h-screen flex items-center justify-center'>
					<Form className='w-10/12 p-2 py-5 flex flex-col md:w-1/2 lg:w-8/12 xl:w-6/12 lg:h-96 lg:p-10 rounded-lg bg-Moderateblue'>
						<h2 className='text-2xl text-center text-White mb-8'>Login with google or your account</h2>
						<div className='px-12 pb-10'>
							<InputField type='email' name='email' placeholder='Email Address' errors={errors} touched={touched} />
							<InputField type='password' name='password' placeholder='Password' errors={errors} touched={touched} />
							<div className='flex justify-between space-x-3'>
								<button
									type='submit'
									className=' w-1/2 py-2 mt-8 rounded-full border border-blue-400 text-White focus:outline-none hover:bg-blue-400 '
									disabled={isSubmitting}
								>
									Login
								</button>
								<button
									disabled={isSubmitting}
									onClick={onGoogleClick}
									type='button'
									className=' w-1/2 py-2 mt-8 rounded-full flex justify-center items-center border border-SoftRed text-gray-100 focus:outline-none hover:bg-SoftRed '
								>
									<img src='/assets/google.png' alt='' className='w-6' />
								</button>
							</div>
						</div>
						<NavLink to='/auth/register' className='self-end text-sm text-LightGrayishBlue cursor-pointer'>
							Don't have an account yet? <span className='underline'>Click here</span>
						</NavLink>
					</Form>
				</div>
			)}
		</Formik>
	);
};
