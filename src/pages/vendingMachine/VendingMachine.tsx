import VendingMachineContextProvider from './VendingMachineContextProvider';
import StatusSection from './StatusSection';
import MenuSection from './MenuSection';
import PaymentMethodSection from './PaymentMethodSection';

export default function VendingMachine() {
	return (
		<section className='relative flex flex-col gap-6 top-[15%] m-auto p-8 max-w-xl justify-center'>
			<VendingMachineContextProvider>
				<StatusSection />
				<MenuSection />
				<PaymentMethodSection />
			</VendingMachineContextProvider>
		</section>
	);
}
