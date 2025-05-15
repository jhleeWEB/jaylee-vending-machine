import { Button, Card, CardBody } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import SuperBigText from './SuperBigText';
import formatToWon from '../utils/formatToWon';

const cashNotes = [10, 50, 100, 500, 1000, 5000, 10000, 50000];

export default function CashPayment() {
	const { state, dispatch } = useVendingMachineContext();

	const onPressCashValue = (amount: number) => {
		if (isValidCash(amount)) {
			dispatch({ type: 'ADD_FUNDS', amount });
			dispatch({ type: 'TRANSITION_STATE', nextState: 'selection' });
		} else {
			alert(
				`${formatToWon(amount)} ${
					isCoin(amount) ? '동전은' : '지폐는'
				} 사용할 수 없습니다.`
			);
		}
	};

	const onPressReturnCash = () => {
		dispatch({ type: 'RETURN_FUNDS' });
		dispatch({ type: 'TRANSITION_STATE', nextState: 'idle' });
	};

	const isValidCash = (value: number) => {
		switch (value) {
			case 100:
			case 500:
			case 1000:
			case 5000:
			case 10000:
				return true;
			default:
				return false;
		}
	};

	const isCoin = (value: number) => {
		switch (value) {
			case 1000:
			case 5000:
			case 10000:
			case 50000:
				return false;
			default:
				return true;
		}
	};

	return (
		<Card>
			<CardBody className='gap-2'>
				<div className='grid grid-cols-5 gap-2'>
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
