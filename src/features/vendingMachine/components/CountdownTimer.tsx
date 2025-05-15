import { millisecondsToSeconds } from 'framer-motion';

import { useEffect, useRef, useState } from 'react';
import { useVendingMachineContext } from '../contexts/VendingMachineContextProvider';
import SuperBigText from './SuperBigText';
import { SECONDS } from '../commons/constants';

const DEFAULT_COUNTDOWN_TIME = 10000;

export default function CountdownTimer() {
	const [countdown, setCountdown] = useState(DEFAULT_COUNTDOWN_TIME);
	const { state, dispatch } = useVendingMachineContext();
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		if (state.funds > 0) {
			reStartCountdown();
		}
	}, [state.funds]);

	useEffect(() => {
		if (state.machineState === 'selection') {
			startCountdown();
		} else if (state.machineState === 'dispense') {
			resetCountdown();
		} else if (state.machineState === 'idle') {
			stopCountdown();
		}
	}, [state.machineState]);

	const startCountdown = () => {
		clearCountdown();
		intervalRef.current = setInterval(() => {
			setCountdown((prevState) => {
				if (prevState <= 0) {
					stopCountdown();
					return 0;
				}
				return prevState - SECONDS;
			});
		}, SECONDS);
	};

	const stopCountdown = () => {
		clearCountdown();
		setCountdown(DEFAULT_COUNTDOWN_TIME);
		dispatch({ type: 'TRANSITION_STATE', nextState: 'idle' });
		if (state.paymentType === 'card') {
			dispatch({ type: 'EJECT_CARD' });
		} else {
			dispatch({ type: 'RETURN_FUNDS' });
		}
	};

	const resetCountdown = () => {
		clearCountdown();
		setCountdown(DEFAULT_COUNTDOWN_TIME);
	};

	const reStartCountdown = () => {
		clearCountdown();
		setCountdown(DEFAULT_COUNTDOWN_TIME);
		startCountdown();
	};

	const clearCountdown = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	return (
		<SuperBigText size='md' position='center'>
			{millisecondsToSeconds(countdown)}
		</SuperBigText>
	);
}
