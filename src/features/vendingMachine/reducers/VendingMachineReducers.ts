export type StateType = 'idle' | 'selection' | 'dispense';
export type PaymentType = 'cash' | 'card';
export interface VendingMachineState {
	machineState: StateType;
	paymentType: PaymentType;
	funds: number;
	cardInfo: {
		name: string;
		balance: number;
	} | null;
}

export type VendingMachineAction =
	| {
			type: 'PURCHASE';
			price: number;
	  }
	| {
			type: 'ADD_FUNDS';
			price: number;
	  }
	| {
			type: 'CHANGE_PAYMENT_TYPE';
			paymentType: PaymentType;
	  }
	| {
			type: 'TRANSITION_STATE';
			nextState: StateType;
	  }
	| {
			type: 'INSERT_CARD';
			cardInfo: {
				name: string;
				balance: number;
			};
	  }
	| {
			type: 'EJECT_CARD';
	  }
	| {
			type: 'RETURN_FUNDS';
	  };

export default function vendingMachineReducer(
	state: VendingMachineState,
	action: VendingMachineAction
) {
	switch (action.type) {
		case 'TRANSITION_STATE':
			return { ...state, machineState: action.nextState };
		case 'ADD_FUNDS':
			const funds = state.funds + action.price;
			return {
				...state,
				funds,
			};
		case 'INSERT_CARD':
			return {
				...state,
				cardInfo: { ...action.cardInfo },
			};
		case 'CHANGE_PAYMENT_TYPE':
			return {
				...state,
				paymentType: action.paymentType,
			};
		case 'PURCHASE':
			if (state.paymentType === 'cash') {
				const funds = state.funds - action.price;
				return {
					...state,
					funds,
				};
			} else {
				if (state.cardInfo) {
					const newCardInfo = { ...state.cardInfo };
					newCardInfo.balance -= action.price;
					return {
						...state,
						cardInfo: newCardInfo,
					};
				} else {
					return state;
				}
			}
		case 'EJECT_CARD':
			return { ...state, cardInfo: null };
		case 'RETURN_FUNDS':
			return { ...state, funds: 0 };
	}
}
