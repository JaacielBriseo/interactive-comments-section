import { CSSProperties } from 'react';

interface CommentCardLayoutProps {
	children: JSX.Element | JSX.Element[];
	styles?: CSSProperties;
	className?: string;
}
export const CommentCardLayout = ({ children, ...props }: CommentCardLayoutProps) => {
	return (
		<main style={props.styles} className={props.className}>
			{children}
		</main>
	);
};
