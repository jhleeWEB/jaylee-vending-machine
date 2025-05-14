import { Spinner } from '@heroui/react';

export default function Cover() {
	return (
		<div className='z-10 absolute w-full h-full pointer-events-none flex content-center justify-center opacity-55 bg-slate-300 align-middle'>
			<Spinner />
		</div>
	);
}
