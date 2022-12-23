import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string()
			.matches(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/,
				'Password must have at least one uppercase letter, one lowercase letter, and one number'
			)
			.required('Password is required'),
		name: Yup.string()
			.min(6, 'Please enter your full name')
			.max(20, 'Max characters 20')
			.required('This Field is required'),
		confirmPassword: Yup.string()
			.when('password', {
				is: (val: string | null | undefined) => !!(val && val.length > 0),
				then: Yup.string().oneOf([Yup.ref('password')], 'Confirm password must match password'),
			})
			.required('Confirm password is required'),
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', name: '', confirmPassword: '' }}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					console.log(values);
					setSubmitting(false);
				}, 400);
			}}
		>
			{({ isSubmitting, errors, touched }) => (
				<div className='w-full h-screen flex items-center justify-center'>
					<Form className='w-10/12 p-2 py-5 md:w-1/3 rounded-lg bg-Moderateblue'>
						<h2 className='text-2xl text-center text-SoftRed mb-8'>Register</h2>
						<div className='px-12 pb-10'>
							<div className='w-full mb-2'>
								<Field
									type='text'
									name='name'
									placeholder='Complete name'
									className=' w-full border rounded px-3 py-2 text-gray-700 focus:outline-none '
								/>
								{errors.name && touched.name && <div className='text-red-500'>{errors.name}</div>}
							</div>
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
									className=' w-full border rounded px-3 py-2 text-gray-700 focus:outline-none '
								/>
								{errors.password && touched.password && <div className='text-red-500'>{errors.password}</div>}
							</div>
							<div className='w-full mb-2'>
								<Field
									type='password'
									name='confirmPassword'
									placeholder='Confirm Password'
									className=' w-full border rounded px-3 py-2 text-gray-700 focus:outline-none'
								/>
								{errors.confirmPassword && touched.confirmPassword && (
									<div className='text-red-500'>{errors.confirmPassword}</div>
								)}
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
