import { useContext } from 'react';
import { Card, CardBody, CardHeader, Divider, Tab, Tabs } from '@heroui/react';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';
import CashPayment from '../components/CashPayment';
import CardPayment from '../components/CardPayment';
import Cover from '../components/Cover';

export default function PaymentMethodSection() {
	const { machineState } = useContext(VendingMachineStateContext);

	return (
		<Card
			className={`min-h-fit ${
				machineState.state === 'dispense' ? 'pointer-events-none' : ''
			}`}
		>
			{machineState.state === 'dispense' && <Cover />}
			<CardHeader className='text-3xl font-bold'>Payment Method</CardHeader>
			<Divider />
			<CardBody>
				<Tabs aria-label='Options' defaultSelectedKey='cash' fullWidth>
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
