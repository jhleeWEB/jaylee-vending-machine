import { Button, Card, CardBody } from '@heroui/react';
import formatToWon from '../utils/formatToWon';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import { fetchCardInfo_FAKE } from '../apis';

export default function CardPayment() {
	const { state, dispatch } = useVendingMachineContext();

	const onPressInsertCard = async () => {
		dispatch({ type: 'TRANSITION_STATE', nextState: 'ignore' });
		try {
			const data = await fetchCardInfo_FAKE();
			if (data) {
				dispatch({ type: 'UPDATE_CARD', cardInfo: data });
				dispatch({ type: 'TRANSITION_STATE', nextState: 'selection' });
			}
		} catch (e) {
			throw new Error('카드 정보 불러오기 요청 실패 했습니다.');
		}
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
