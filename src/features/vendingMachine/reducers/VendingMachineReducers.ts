export type StateType = 'idle' | 'selection' | 'ignore';
export type PaymentType = 'cash' | 'card';
export type Item = {
	id: number;
	title: string;
	price: number;
	count: number;
};
export interface VendingMachineState {
	machineState: StateType;
	paymentType: PaymentType;
	funds: number;
	cardInfo: {
		name: string;
		balance: number;
	} | null;
	inventory: Item[];
	isSoldOut: boolean;
}

export type VendingMachineAction =
	| {
			type: 'DECREMENT_INVENTORY_ITEM';
			id: number;
	  }
	| {
			type: 'ADD_FUNDS';
			amount: number;
	  }
	| {
			type: 'DEDUCT_FUNDS';
			amount: number;
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
			type: 'UPDATE_CARD';
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

const checkInventory = (inventory: Item[]) => {
	return inventory.every((item) => item.count === 0);
};

export default function vendingMachineReducer(
	state: VendingMachineState,
	action: VendingMachineAction
) {
	switch (action.type) {
		case 'TRANSITION_STATE':
			return { ...state, machineState: action.nextState };
		case 'ADD_FUNDS':
			return {
				...state,
				funds: state.funds + action.amount,
			};
		case 'DEDUCT_FUNDS':
			return {
				...state,
				funds: state.funds - action.amount,
			};
		case 'UPDATE_CARD':
			return {
				...state,
				cardInfo: { ...action.cardInfo },
			};
		case 'CHANGE_PAYMENT_TYPE':
			return {
				...state,
				paymentType: action.paymentType,
			};
		case 'DECREMENT_INVENTORY_ITEM':
			const inventory = state.inventory.map((item) => ({ ...item }));
			inventory[action.id].count -= 1;
			const isSoldOut = checkInventory(inventory);
			return {
				...state,
				inventory,
				isSoldOut,
			};
		case 'EJECT_CARD':
			return { ...state, cardInfo: null };
		case 'RETURN_FUNDS':
			return { ...state, funds: 0 };
		default:
			return { ...state };
	}
}
