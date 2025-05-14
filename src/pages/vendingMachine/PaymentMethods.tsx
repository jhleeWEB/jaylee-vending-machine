import { useContext, useEffect, useState } from 'react';
import { StateContext } from './ContextProvider';
import uuid from 'react-uuid';
import { Button, Card, CardBody, CardHeader, Tab, Tabs } from '@heroui/react';
import formatToWon from '../../utils/formatToWon';
import Cover from '../../components/Cover';

const cashNotes = [100, 500, 1000, 5000, 10000];
const cardInfo = {
	name: 'LEE JOONG HOON',
	balance: 200000,
};

type PaymentType = 'cash' | 'card';

export default function PaymentMethods() {
	const { machineState, setMachineState } = useContext(StateContext);
	const [paymentType, setPaymentType] = useState<PaymentType>('cash');
	const [insertedCard, setInsertedCard] = useState<
		typeof cardInfo | undefined
	>();

	useEffect(() => {
		if (paymentType === 'card' && insertedCard) {
			setInsertedCard({ ...insertedCard, balance: machineState.funds });
		}
	}, [machineState.funds]);

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

	const onPressInsertCard = () => {
		setInsertedCard(cardInfo);
		setMachineState({ state: 'selection', funds: cardInfo.balance });
	};

	const onPressEjectCard = () => {
		setInsertedCard(undefined);
		setMachineState({ state: 'idle', funds: 0 });
	};

	return (
		<Card>
			{machineState.state === 'dispense' && <Cover />}
			<CardHeader className='text-3xl font-bold'>Payment Method</CardHeader>
			<CardBody>
				<Tabs
					aria-label='Options'
					onSelectionChange={(key: string | number) =>
						setPaymentType(key as PaymentType)
					}
					defaultSelectedKey={paymentType}
					fullWidth
				>
					<Tab key='cash' title='Cash'>
						<Card>
							<CardBody className='gap-2'>
								<div className='flex gap-2'>
									{cashNotes.map((note) => (
										<Button
											key={uuid()}
											className='font-bold'
											variant='flat'
											onPress={() => onPressCashValue(note)}
										>{`${note.toLocaleString()}원`}</Button>
									))}
								</div>
								<p className='text-5xl text-right font-bold bg-gray-100 rounded-lg p-4'>{`${machineState.funds.toLocaleString()}원`}</p>
								<div className='flex w-full justify-center gap-2'>
									<Button color='danger' fullWidth onPress={onPressReturnCash}>
										Return Cash
									</Button>
								</div>
							</CardBody>
						</Card>
					</Tab>
					<Tab key='card' title='Card'>
						<Card>
							<CardBody className='gap-2'>
								{insertedCard && (
									<div className=' bg-gray-100 rounded-lg p-4'>
										<p className='text-xl text-right font-bold'>
											{insertedCard.name}
										</p>
										<p className='text-2xl text-right font-bold'>
											{formatToWon(insertedCard.balance)}
										</p>
									</div>
								)}
								<Button
									color={insertedCard ? 'danger' : 'primary'}
									onPress={insertedCard ? onPressEjectCard : onPressInsertCard}
								>
									{insertedCard ? 'Eject Card' : 'Insert Card'}
								</Button>
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</CardBody>
		</Card>
	);
}
