import VendingMachine from '../features/vendingMachine/VendingMachine';

export default function MainPage() {
	return (
		<section className='relative flex flex-col gap-6 top-[15%] m-auto p-8 max-w-xl justify-center'>
			<VendingMachine />
		</section>
	);
}
