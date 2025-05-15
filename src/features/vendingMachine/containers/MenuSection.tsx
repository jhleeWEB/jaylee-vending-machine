import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import MenuItem from '../components/MenuItem';
import Cover from '../components/Cover';

export default function MenuSection() {
	const { state } = useVendingMachineContext();

	return (
		<Card
			className={`min-h-fit ${
				state.machineState === 'dispense' ? 'pointer-events-none' : ''
			}`}
		>
			{state.machineState === 'dispense' && <Cover />}
			<CardHeader className='text-3xl font-bold'>Menu</CardHeader>
			<Divider />
			<CardBody className='grid grid-cols-3 gap-2'>
				{state.inventory.map((item) => (
					<MenuItem key={item.id} {...item} />
				))}
			</CardBody>
		</Card>
	);
}
