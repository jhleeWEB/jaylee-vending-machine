import { Card, CardBody, CardHeader, Divider, Tab, Tabs } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import CashPayment from '../components/CashPayment';
import CardPayment from '../components/CardPayment';
import Cover from '../components/Cover';

export default function PaymentMethodSection() {
	const { state } = useVendingMachineContext();

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
					isDisabled={state.funds > 0}
					aria-label='Options'
					defaultSelectedKey='cash'
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
