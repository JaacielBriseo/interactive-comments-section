import { startGoogleSignIn, startLoginWithEmail, useAppDispatch } from '../../store';
import * as Yup from 'yup';
export const useLogin = () => {
	const dispatch = useAppDispatch();
	const onGoogleClick = () => {
		dispatch(startGoogleSignIn());
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
	});
	const startLogin = (values: { email: string; password: string }) => {
		dispatch(startLoginWithEmail({ email: values.email, password: values.password }));
	};
	return {
        startLogin,
        validationSchema,
        onGoogleClick
    };
};
