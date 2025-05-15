import { Button, Card, CardBody } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import SuperBigText from './SuperBigText';

const cashNotes = [100, 500, 1000, 5000, 10000];

export default function CashPayment() {
	const { state, dispatch } = useVendingMachineContext();

	const onPressCashValue = (amount: number) => {
		dispatch({ type: 'ADD_FUNDS', amount });
		dispatch({ type: 'TRANSITION_STATE', nextState: 'selection' });
	};

	const onPressReturnCash = () => {
		dispatch({ type: 'RETURN_FUNDS' });
		dispatch({ type: 'TRANSITION_STATE', nextState: 'idle' });
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
				>{`${state.funds.toLocaleString()}원`}</SuperBigText>
				<div className='flex w-full justify-center gap-2'>
					<Button color='danger' fullWidth onPress={onPressReturnCash}>
						Return Cash
					</Button>
				</div>
			</CardBody>
		</Card>
	);
}
