import { startCreatingUserWithEmailPassword, useAppDispatch } from '../../store';
import * as Yup from 'yup';

export const useRegister = () => {
	const dispatch = useAppDispatch();
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
	const startCreatingUser = (values: { email: string; password: string; name: string; confirmPassword: string }) => {
		dispatch(
			startCreatingUserWithEmailPassword({
				email: values.email,
				password: values.password,
				displayName: values.name,
			})
		);
	};
	return {
		validationSchema,
		startCreatingUser,
	};
};
