export const CardContent = ({ content, replyingTo }: { content: string; replyingTo?: string }) => {
	return (
		<div className='text-GrayishBlue flex flex-col justify-start rounded-lg p-1 my-7 '>
			<div>
				{replyingTo !== undefined && <p className="text-Moderateblue md:text-lg lg:text-xl">@{replyingTo}</p>}
				<p className='text-sm text-justify md:text-lg lg:text-xl'>{content}</p>
			</div>
		</div>
	);
};