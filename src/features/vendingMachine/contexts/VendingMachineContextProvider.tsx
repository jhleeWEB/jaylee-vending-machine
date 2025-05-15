import React, { createContext, useContext, useReducer, useState } from 'react';
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
	inventory: [
		{
			id: 0,
			title: '콜라',
			price: 1100,
			count: 5,
		},
		{
			id: 1,
			title: '커피',
			price: 700,
			count: 4,
		},
		{
			id: 2,
			title: '물',
			price: 600,
			count: 6,
		},
	],
};
type VendingMachineContextType = {
	state: VendingMachineState;
	dispatch: React.ActionDispatch<[action: VendingMachineAction]>;
};
export const VendingMachineStateContext =
	createContext<VendingMachineContextType | null>(null);

export function useVendingMachineContext() {
	const value = useContext(VendingMachineStateContext);
	if (!value) {
		throw new Error(
			'useVendingMachineContext가 VendingMachineContextProvider 내부에 없습니다!'
		);
	}
	return value;
}

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
