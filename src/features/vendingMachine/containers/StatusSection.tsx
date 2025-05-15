import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';

import CountdownTimer from '../components/CountdownTimer';
import SuperBigText from '../components/SuperBigText';

export default function StatusSection() {
	const { state } = useVendingMachineContext();

	return (
		<Card className='min-h-fit'>
			<CardHeader className='text-3xl font-bold'>Status</CardHeader>
			<Divider />
			<CardBody className='flex flex-row justify-between gap-2'>
				<SuperBigText size='md' position='center'>
					{state.machineState.toUpperCase()}
				</SuperBigText>
				<CountdownTimer />
			</CardBody>
		</Card>
	);
}
