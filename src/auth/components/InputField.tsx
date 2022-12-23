import { Field, FormikErrors, FormikTouched } from 'formik';

interface InputFieldProps {
	type: string;
	name: string;
	placeholder: string;
	errors: FormikErrors<{ [x: string]: string }>;
	touched: FormikTouched<{ [x: string]: string }>;
}

export const InputField: React.FC<InputFieldProps> = ({ name, placeholder, errors, touched, type }) => {
	return (
		<div className='w-full mb-2'>
			<Field
				type={type}
				name={name}
				placeholder={placeholder}
				className=' w-full border rounded px-3 py-2 text-gray-700 focus:outline-none '
			/>
			{errors[name] && touched[name] && <div className='text-red-500'>{errors[name]}</div>}
		</div>
	);
};
