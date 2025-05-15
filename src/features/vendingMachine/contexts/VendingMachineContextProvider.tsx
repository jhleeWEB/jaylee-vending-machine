import React, { createContext, useReducer, useState } from 'react';
import vendingMachineReducer, {
	type VendingMachineAction,
	type VendingMachineState,
} from '../reducers/VendingMachineReducers';

type ContextProviderProps = {
	children: React.ReactNode;
};

const initialState: VendingMachineState = {
	funds: 0,
	machineState: 'idle',
	paymentType: 'cash',
	cardInfo: null,
};
type VendingMachineContextType = {
	state: VendingMachineState;
	dispatch: React.ActionDispatch<[action: VendingMachineAction]>;
};
export const VendingMachineStateContext =
	createContext<VendingMachineContextType | null>(null);

export default function VendingMachineContextProvider({
	children,
}: ContextProviderProps) {
	const [state, dispatch] = useReducer(vendingMachineReducer, initialState);

	const value = {
		state,
		dispatch,
	};

	return (
		<VendingMachineStateContext.Provider value={value}>
			{children}
		</VendingMachineStateContext.Provider>
	);
}
