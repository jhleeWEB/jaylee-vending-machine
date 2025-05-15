import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import MenuItem from '../components/MenuItem';
import Cover from '../components/Cover';

const items = [
	{
		id: 0,
		title: '콜라',
		price: 1100,
	},
	{
		id: 1,
		title: '커피',
		price: 700,
	},
	{
		id: 2,
		title: '물',
		price: 600,
	},
];

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
				{items.map(({ id, title, price }) => (
					<MenuItem key={id} title={title} price={price} />
				))}
			</CardBody>
		</Card>
	);
}
