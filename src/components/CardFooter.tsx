export const CardFooter = ({ score, user }: { score: number; user?: boolean }) => {
	return (
		<div className='flex justify-between '>
			<div className='flex items-center p-1 justify-between bg-VeryLightGray w-20 h-8'>
				<button>
					<img src='./assets/icon-plus.svg' alt='plus' className='text-LightGrayishBlue' />
				</button>
				<p className='text-Moderateblue font-medium'>{score}</p>
				<button>
					<img src='./assets/icon-minus.svg' alt='minus' className='text-LightGrayishBlue' />
				</button>
			</div>
			{user ? (
				<div className='flex items-center space-x-2'>
					<button className='flex items-center m-1 text-SoftRed space-x-1'>
						<img src='./assets/icon-delete.svg' alt='reply' className='w-4 h-4' />
						<h1 className='font-bold'>Delete</h1>
					</button>
					<button className='flex items-center m-1 text-Moderateblue space-x-1'>
						<img src='./assets/icon-edit.svg' alt='reply' className='w-4 h-4' />
						<h1 className='font-bold'>Edit</h1>
					</button>
				</div>
			) : (
				<button className='flex items-center space-x-2'>
					<img src='./assets/icon-reply.svg' alt='reply' className='w-4 h-4' />
					<h3 className='text-Moderateblue font-bold'>Reply</h3>
				</button>
			)}
		</div>
	);
};
