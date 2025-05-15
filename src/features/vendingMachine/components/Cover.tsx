import { Spinner } from '@heroui/react';

//금액을 결제할때와 음료를 배분할때 사용자 인터렉션을 막기 위해 컴포넌트를 덮어주는 컴포넌트 입니다.
export default function Cover() {
	return (
		<div className='z-50 absolute w-full h-full flex content-center justify-center opacity-75 bg-slate-300 align-middle'>
			<Spinner />
		</div>
	);
}
