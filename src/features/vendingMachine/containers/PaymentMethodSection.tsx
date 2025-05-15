import { Card, CardBody, CardHeader, Divider, Tab, Tabs } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import CashPayment from '../components/CashPayment';
import CardPayment from '../components/CardPayment';
import Cover from '../components/Cover';
import type { PaymentType } from '../reducers/VendingMachineReducers';

export default function PaymentMethodSection() {
	const { state, dispatch } = useVendingMachineContext();

	const isMoneyInserted = state.funds > 0 || (state.cardInfo?.balance || 0) > 0;

	return (
		<Card
			className={`min-h-fit ${
				state.machineState === 'dispense' ? 'pointer-events-none' : ''
			}`}
		>
			{state.machineState === 'dispense' && <Cover />}
			<CardHeader className='text-3xl font-bold'>Payment Method</CardHeader>
			<Divider />
			<CardBody>
				<Tabs
					isDisabled={isMoneyInserted}
					aria-label='Options'
					defaultSelectedKey='cash'
					onSelectionChange={(key) =>
						dispatch({
							type: 'CHANGE_PAYMENT_TYPE',
							paymentType: key as PaymentType,
						})
					}
					fullWidth
				>
					<Tab key='cash' title='Cash'>
						<CashPayment />
					</Tab>
					<Tab key='card' title='Card'>
						<CardPayment />
					</Tab>
				</Tabs>
			</CardBody>
		</Card>
	);
}
