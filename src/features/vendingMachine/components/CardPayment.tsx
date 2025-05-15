import { useEffect, useState } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import formatToWon from '../utils/formatToWon';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';

const sample = {
	name: 'LEE JOONG HOON',
	balance: 200000,
};

export default function CardPayment() {
	const { state, dispatch } = useVendingMachineContext();

	const onPressInsertCard = () => {
		dispatch({ type: 'INSERT_CARD', cardInfo: sample });
		dispatch({ type: 'TRANSITION_STATE', nextState: 'selection' });
	};

	const onPressEjectCard = () => {
		dispatch({ type: 'EJECT_CARD' });
		dispatch({ type: 'TRANSITION_STATE', nextState: 'idle' });
	};

	return (
		<Card>
			<CardBody className='gap-2'>
				{state.cardInfo && (
					<div className=' bg-gray-100 rounded-lg p-4'>
						<p className='text-xl text-right font-bold'>
							{state.cardInfo.name}
						</p>
						<p className='text-2xl text-right font-bold'>
							{formatToWon(state.cardInfo.balance)}
						</p>
					</div>
				)}
				<Button
					color={state.cardInfo ? 'danger' : 'primary'}
					onPress={state.cardInfo ? onPressEjectCard : onPressInsertCard}
				>
					{state.cardInfo ? 'Eject Card' : 'Insert Card'}
				</Button>
			</CardBody>
		</Card>
	);
}
