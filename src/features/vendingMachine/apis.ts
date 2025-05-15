import { SECONDS } from './commons/constants';

interface CardInfo {
	name: string;
	balance: number;
}
const sample = {
	name: 'LEE JOONG HOON',
	balance: 200000,
};

export function fetchCardInfo_FAKE() {
	const result = new Promise<CardInfo>((resolve) => {
		const id = setTimeout(() => {
			resolve(sample);
			clearTimeout(id);
		}, SECONDS * 2);
	});
	return result;
}

export function postCardPayment_FAKE(price: number, cardInfo: CardInfo) {
	const info = { ...cardInfo };
	info.balance -= price;

	const result = new Promise<typeof sample>((resolve) => {
		const id = setTimeout(() => {
			resolve(info);
			clearTimeout(id);
		}, SECONDS * 3);
	});
	return result;
}
export function dispenseProduct_FAKE() {
	const result = new Promise((resolve) => {
		const id = setTimeout(() => {
			resolve('dispensed');
			clearTimeout(id);
		}, SECONDS * 1);
	});
	return result;
}
