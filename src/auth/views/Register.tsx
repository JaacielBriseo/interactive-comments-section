import { Formik, Form } from 'formik';
import { InputField } from '../components';
import { NavLink } from 'react-router-dom';
import { useRegister } from '../hooks';

export const Register = () => {
	const { startCreatingUser, validationSchema } = useRegister();

	return (
		<Formik
			initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				startCreatingUser(values);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting, errors, touched }) => (
				<div className='w-full h-screen flex items-center justify-center'>
					<Form className='w-10/12 p-2 py-5 flex flex-col md:w-1/2 lg:w-8/12 xl:w-6/12 lg:p-10 rounded-lg bg-Moderateblue'>
						<h2 className='text-2xl text-center text-SoftRed mb-8'>Register</h2>
						<div className='px-12 pb-10 space-y-5 flex flex-col items-center'>
							<InputField errors={errors} name='name' placeholder='Complete name' touched={touched} type='text' />
							<InputField errors={errors} name='email' placeholder='Email Address' touched={touched} type='email' />
							<InputField errors={errors} name='password' placeholder='Password' touched={touched} type='password' />
							<InputField
								errors={errors}
								name='confirmPassword'
								placeholder='Confirm Password'
								touched={touched}
								type='password'
							/>
							<button
								type='submit'
								className='w-full py-2 rounded-full border border-blue-400 text-gray-100 focus:outline-none lg:p-5 lg:w-1/2'
								disabled={isSubmitting}
							>
								Register my account
							</button>
						</div>
						<NavLink to={'/auth/login'} className='self-end underline underline-offset-2'>
							Login with an account
						</NavLink>
					</Form>
				</div>
			)}
		</Formik>
	);
};
