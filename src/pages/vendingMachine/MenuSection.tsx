import { useContext } from 'react';
import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import uuid from 'react-uuid';
import { StateContext } from './VendingMachineContextProvider';
import Item from './Item';
import Cover from './components/Cover';

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
	const { machineState } = useContext(StateContext);

	return (
		<Card className='min-h-fit'>
			{machineState.state === 'dispense' && <Cover />}
			<CardHeader className='text-3xl font-bold'>Menu</CardHeader>
			<Divider />
			<CardBody className='grid grid-cols-3 gap-2'>
				{items.map(({ title, price }) => (
					<Item key={uuid()} title={title} price={price} />
				))}
			</CardBody>
		</Card>
	);
}
