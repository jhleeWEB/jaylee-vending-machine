import { useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import formatToWon from '../utils/formatToWon';
import { dispenseProduct_FAKE, postCardPayment_FAKE } from '../apis';
interface Props {
	title: string;
	price: number;
	id: number;
	count: number;
}

export default function MenuItem({ title, price, id, count }: Props) {
	const { state, dispatch } = useVendingMachineContext();
	const delayTimeout = useRef<number | null>(null);

	let money = state.funds;
	if (state.paymentType === 'card' && state.cardInfo) {
		money = state.cardInfo.balance;
	}

	const isDisabled = money < price || count === 0;

	useEffect(() => {
		return () => {
			clearDelayTimeout();
		};
	}, []);

	const purchaseProduct = async () => {
		clearDelayTimeout();
		if (state.paymentType === 'cash') {
			await dispenseProduct_FAKE();
			dispatch({ type: 'DEDUCT_FUNDS', amount: price });
			dispatch({ type: 'DECREMENT_INVENTORY_ITEM', id: id });
			dispatch({ type: 'TRANSITION_STATE', nextState: 'selection' });
		} else {
			if (state.cardInfo) {
				const data = await postCardPayment_FAKE(price, state.cardInfo);
				dispatch({ type: 'UPDATE_CARD', cardInfo: data });
				dispatch({ type: 'DECREMENT_INVENTORY_ITEM', id: id });
				dispatch({ type: 'TRANSITION_STATE', nextState: 'selection' });
			}
		}
	};

	const clearDelayTimeout = () => {
		if (delayTimeout.current) {
			clearTimeout(delayTimeout.current);
			delayTimeout.current = null;
		}
	};

	const onClickItem = () => {
		dispatch({ type: 'TRANSITION_STATE', nextState: 'ignore' });
		purchaseProduct();
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
				<small className='text-default-500'>{count}개</small>
				<h4 className='font-bold text-large'>
					{title}
					{count === 0 && '(품절)'}
				</h4>
			</CardHeader>
			<CardBody className='overflow-visible py-2'></CardBody>
		</Card>
	);
}
