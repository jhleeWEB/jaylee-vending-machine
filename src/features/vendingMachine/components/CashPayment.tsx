import { Button, Card, CardBody } from '@heroui/react';
import { useContext } from 'react';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';
import SuperBigText from './SuperBigText';

const cashNotes = [100, 500, 1000, 5000, 10000];

export default function CashPayment() {
	const { machineState, setMachineState } = useContext(
		VendingMachineStateContext
	);

	const onPressCashValue = (amount: number) => {
		setMachineState({
			...machineState,
			funds: machineState.funds + amount,
			state: 'selection',
		});
	};

	const onPressReturnCash = () => {
		setMachineState({ ...machineState, funds: 0, state: 'idle' });
	};

	return (
		<Card>
			<CardBody className='gap-2'>
				<div className='flex gap-2'>
					{cashNotes.map((note) => (
						<Button
							key={note}
							className='font-bold'
							variant='bordered'
							onPress={() => onPressCashValue(note)}
						>{`${note.toLocaleString()}원`}</Button>
					))}
				</div>
				<SuperBigText
					size='lg'
					position='right'
				>{`${machineState.funds.toLocaleString()}원`}</SuperBigText>
				<div className='flex w-full justify-center gap-2'>
					<Button color='danger' fullWidth onPress={onPressReturnCash}>
						Return Cash
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
