import React, { createContext, useState } from 'react';

type StateType = 'idle' | 'selection' | 'payment' | 'dispense';

interface MachineState {
	state: StateType;
	funds: number;
}

type StateContextType = {
	machineState: MachineState;
	setMachineState: React.Dispatch<React.SetStateAction<MachineState>>;
};

// @ts-ignore
export const StateContext = createContext<StateContextType>(null);

type ContextProviderProps = {
	children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProviderProps) => {
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
};
