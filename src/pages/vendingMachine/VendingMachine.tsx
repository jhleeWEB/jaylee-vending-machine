import { ContextProvider } from './ContextProvider';
import StateDisplay from './StateDisplay';
import ItemGrid from './ItemGrid';
import PaymentMethods from './PaymentMethods';

export default function VendingMachine() {
	return (
		<ContextProvider>
			<div className='flex flex-col gap-6 p-8 max-w-xl'>
				<StateDisplay />
				<ItemGrid />
				<PaymentMethods />
			</div>
		</ContextProvider>
	);
}
