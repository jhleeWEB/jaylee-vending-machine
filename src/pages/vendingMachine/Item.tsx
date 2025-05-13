import { useContext } from 'react';
import { StateContext } from './ContextProvider';
import { Card, CardBody, CardHeader } from '@heroui/react';
import formatToWon from '../../utils/formatToWon';
interface Props {
	title: string;
	price: number;
}

export default function Item({ title, price }: Props) {
	const { machineState, setMachineState } = useContext(StateContext);

	const onClickItem = () => {
		const nextState = { ...machineState };

		if (nextState.funds >= price) {
			nextState.state = 'dispense';
			nextState.funds = nextState.funds - price;
			setMachineState(nextState);
		} else {
			alert('Not enought mineral');
		}
	};

	return (
		<Card className='py-4' isPressable onClick={onClickItem}>
			<CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
				<p className='text-tiny uppercase font-bold'>{formatToWon(price)}</p>
				<small className='text-default-500'>COLD</small>
				<h4 className='font-bold text-large'>{title}</h4>
			</CardHeader>
			<CardBody className='overflow-visible py-2'></CardBody>
		</Card>
	);
}
