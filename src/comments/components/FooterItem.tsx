import { FooterItemProps } from '../../types';

export const FooterItem = ({ icon, color, text, ...props }: FooterItemProps) => {
	return (
		<button onClick={props.function} className={`flex items-center m-1 space-x-1 ${color}`}>
			<img src={`./assets/${icon}.svg`} alt={icon} />
			{text && <h1 className='font-bold'>{text}</h1>}
		</button>
	);
};
