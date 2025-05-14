import React, { createContext, useState } from 'react';

export type StateType = 'idle' | 'selection' | 'dispense';

export interface MachineState {
	state: StateType;
	funds: number;
}

export type VendingMachineStateContextType = {
	machineState: MachineState;
	setMachineState: React.Dispatch<React.SetStateAction<MachineState>>;
};

// @ts-ignore: 선언 값으로 null로 넘겨주지 안으면 추후 코드가 불필요하게 길어지고 복잡해져 가독성이 떨어진다고 판단하여 무시.
export const StateContext = createContext<VendingMachineStateContextType>(null);

type ContextProviderProps = {
	children: React.ReactNode;
};

export default function VendingMachineContextProvider({
	children,
}: ContextProviderProps) {
	const [machineState, setMachineState] = useState<MachineState>({
		state: 'idle',
		funds: 0,
	});

	const value = {
		machineState,
		setMachineState,
	};

	return (
		<StateContext.Provider value={value}>{children}</StateContext.Provider>
	);
}
