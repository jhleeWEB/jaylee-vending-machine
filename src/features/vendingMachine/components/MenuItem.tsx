import { useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import formatToWon from '../utils/formatToWon';
import { SECONDS } from '../commons/constants';
interface Props {
	title: string;
	price: number;
}

const TWO_SECONDS = SECONDS * 2;

export default function MenuItem({ title, price }: Props) {
	const { state, dispatch } = useVendingMachineContext();
	const delayTimeout = useRef<number | null>(null);

	const isDisabled = state.funds < price;

	useEffect(() => {
		return () => {
			clearDelayTimeout();
		};
	}, []);

	//음료를 배분하고 결제하는 과정에 소요되는 시간은 이 함수로 대체했습니다.
	const startDelayTimeout = () => {
		clearDelayTimeout();
		delayTimeout.current = setTimeout(() => {
			dispatch({ type: 'PURCHASE', price });
		}, TWO_SECONDS);
	};

	const clearDelayTimeout = () => {
		if (delayTimeout.current) {
			clearTimeout(delayTimeout.current);
			delayTimeout.current = null;
		}
	};

	const onClickItem = () => {
		if (state.funds >= price) {
			dispatch({ type: 'TRANSITION_STATE', nextState: 'dispense' });
			startDelayTimeout();
		}
	};

	return (
		<Card
			className='py-4'
			onClick={onClickItem}
			isPressable={!isDisabled}
			isDisabled={isDisabled}
		>
			<CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
				<p className='text-tiny uppercase font-bold'>{formatToWon(price)}</p>
				<small className='text-default-500'>COLD</small>
				<h4 className='font-bold text-large'>{title}</h4>
			</CardHeader>
			<CardBody className='overflow-visible py-2'></CardBody>
		</Card>
	);
}
