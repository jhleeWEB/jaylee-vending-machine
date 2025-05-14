import VendingMachineContextProvider from './contexts/VendingMachineContextProvider';
import StatusSection from './containers/StatusSection';
import MenuSection from './containers/MenuSection';
import PaymentMethodSection from './containers/PaymentMethodSection';

export default function VendingMachine() {
	return (
		<VendingMachineContextProvider>
			<StatusSection />
			<MenuSection />
			<PaymentMethodSection />
		</VendingMachineContextProvider>
	);
}
