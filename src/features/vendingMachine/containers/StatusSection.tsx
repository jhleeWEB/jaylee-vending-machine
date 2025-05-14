import { useContext } from 'react';
import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';

import CountdownTimer from '../components/CountdownTimer';
import SuperBigText from '../components/SuperBigText';

export default function StatusSection() {
	const { machineState } = useContext(VendingMachineStateContext);

	return (
		<Card className='min-h-fit'>
			<CardHeader className='text-3xl font-bold'>Status</CardHeader>
			<Divider />
			<CardBody className='flex flex-row justify-between gap-2'>
				<SuperBigText size='md' position='center'>
					{machineState.state.toUpperCase()}
				</SuperBigText>
				<CountdownTimer />
			</CardBody>
		</Card>
	);
}
