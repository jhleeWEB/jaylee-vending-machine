import { useContext, useEffect, useState } from 'react';
import { Button, Card, CardBody } from '@heroui/react';
import formatToWon from '../utils/formatToWon';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';

const sample = {
	name: 'LEE JOONG HOON',
	balance: 200000,
};

export default function CardPayment() {
	const { machineState, setMachineState } = useContext(
		VendingMachineStateContext
	);
	const [cardInfo, setCardInfo] = useState<typeof sample | null>(null);

	useEffect(() => {
		if (cardInfo) {
			setCardInfo({ ...cardInfo, balance: machineState.funds });
		}
	}, [machineState.funds]);

	useEffect(() => {
		if (machineState.state === 'idle') {
			onPressEjectCard();
		}
	}, [machineState.state]);

	const onPressInsertCard = () => {
		setCardInfo(sample);
		setMachineState({ state: 'selection', funds: sample.balance });
	};

	const onPressEjectCard = () => {
		setCardInfo(null);
		setMachineState({ state: 'idle', funds: 0 });
	};

	return (
		<Card>
			<CardBody className='gap-2'>
				{cardInfo && (
					<div className=' bg-gray-100 rounded-lg p-4'>
						<p className='text-xl text-right font-bold'>{cardInfo.name}</p>
						<p className='text-2xl text-right font-bold'>
							{formatToWon(cardInfo.balance)}
						</p>
					</div>
				)}
				<Button
					color={cardInfo ? 'danger' : 'primary'}
					onPress={cardInfo ? onPressEjectCard : onPressInsertCard}
				>
					{cardInfo ? 'Eject Card' : 'Insert Card'}
				</Button>
			</CardBody>
		</Card>
	);
}
