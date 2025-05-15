import { useContext, useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';
import formatToWon from '../utils/formatToWon';
import { SECONDS } from '../commons/constants';
interface Props {
	title: string;
	price: number;
}

const TWO_SECONDS = SECONDS * 2;

export default function MenuItem({ title, price }: Props) {
	const { machineState, setMachineState } = useContext(
		VendingMachineStateContext
	);
	const delayTimeout = useRef<number | null>(null);

	const isDisabled = machineState.funds < price;

	useEffect(() => {
		return () => {
			clearDelayTimeout();
		};
	}, []);

	//음료를 배분하고 결제하는 과정에 소요되는 시간은 이 함수로 대체했습니다.
	const startDelayTimeout = () => {
		clearDelayTimeout();
		delayTimeout.current = setTimeout(() => {
			setMachineState({
				state: 'selection',
				funds: machineState.funds - price,
			});
		}, TWO_SECONDS);
	};

	const clearDelayTimeout = () => {
		if (delayTimeout.current) {
			clearTimeout(delayTimeout.current);
			delayTimeout.current = null;
		}
	};

	const onClickItem = () => {
		if (machineState.funds >= price) {
			setMachineState((prevState) => ({ ...prevState, state: 'dispense' }));
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
