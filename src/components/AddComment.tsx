export const AddComment = () => {
	return (
		<div className='bg-White w-80 mx-auto p-3 rounded-lg space-y-4'>
			<div className='flex justify-center'>
				<input type='text' className='w-11/12 h-24 rounded-lg border border-GrayishBlue' placeholder='Add a comment' />
			</div>
			<div className='flex justify-between items-center w-11/12'>
				<img src='./images/avatars/image-juliusomo.png' alt='' className='w-8 h-8' />
				<button className='bg-Moderateblue w-24 h-12 rounded-lg text-White font-bold'>SEND</button>
			</div>
		</div>
	);
};
