import uuid from 'react-uuid';
import { Card, CardBody } from '@heroui/react';
import Item from './Item';

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

export default function ItemGrid() {
	return (
		<Card>
			<CardBody className='grid grid-cols-3 gap-2'>
				{items.map(({ title, price }) => (
					<Item key={uuid()} title={title} price={price} />
				))}
			</CardBody>
		</Card>
	);
}
