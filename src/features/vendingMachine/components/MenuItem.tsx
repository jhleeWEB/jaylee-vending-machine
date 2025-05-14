import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';
import formatToWon from '../utils/formatToWon';
interface Props {
	title: string;
	price: number;
}

export default function MenuItem({ title, price }: Props) {
	const { machineState, setMachineState } = useContext(
		VendingMachineStateContext
	);
	const [isDisabled, setDisabled] = useState(false);

	useEffect(() => {
		if (price > machineState.funds) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [machineState.funds]);

	const onClickItem = () => {
		const nextState = { ...machineState };

		if (nextState.funds >= price) {
			nextState.state = 'dispense';
			setMachineState(nextState);
			setTimeout(() => {
				nextState.funds = nextState.funds - price;
				setMachineState({ ...nextState, state: 'selection' });
			}, 2000);
		} else {
			alert('Not enought mineral');
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
