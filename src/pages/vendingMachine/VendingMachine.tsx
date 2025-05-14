import { ContextProvider } from './ContextProvider';
import StateDisplay from './StateDisplay';
import ItemGrid from './ItemGrid';
import PaymentMethods from './PaymentMethods';

export default function VendingMachine() {
	return (
		<div className='flex flex-col gap-6 m-auto p-8 max-w-xl h-lvh justify-center'>
			<ContextProvider>
				<StateDisplay />
				<ItemGrid />
				<PaymentMethods />
			</ContextProvider>
		</div>
	);
}
