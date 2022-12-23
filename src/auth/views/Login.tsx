import { Formik, Field, Form } from 'formik';
import { startLoginWithEmail, useAppDispatch } from '../../store';
import * as Yup from 'yup';

export const Login = () => {
	const dispatch = useAppDispatch();
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
	});

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					dispatch(startLoginWithEmail(values));
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting, errors, touched }) => (
				<div className='w-full h-screen flex items-center justify-center'>
					<Form className='w-10/12 p-2 py-5 md:w-1/3 rounded-lg bg-Moderateblue'>
						<h2 className='text-2xl text-center text-SoftRed mb-8'>Login</h2>
						<div className='px-12 pb-10'>
							<div className='w-full mb-2'>
								<Field
									type='email'
									name='email'
									placeholder='Email Address'
									className=' w-full border rounded px-3 py-2 text-gray-700 focus:outline-none '
								/>
								{errors.email && touched.email && <div className='text-red-500'>{errors.email}</div>}
							</div>
							<div className='w-full mb-2'>
								<Field
									type='password'
									name='password'
									placeholder='Password'
									className=' w-full border rounded px-3 py-2 text-gray-700 focus:outline-none'
								/>
								{errors.password && touched.password && <div className='text-red-500'>{errors.password}</div>}
							</div>
							<button
								type='submit'
								className=' w-full py-2 mt-8 rounded-full bg-blue-400 text-gray-100 focus:outline-none '
								disabled={isSubmitting}
							>
								Login
							</button>
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
};
