import { millisecondsToSeconds } from 'framer-motion';

import { useContext, useEffect, useRef, useState } from 'react';
import { VendingMachineStateContext } from '../contexts/VendingMachineContextProvider';
import SuperBigText from './SuperBigText';

const DEFAULT_COUNTDOWN_TIME = 10000;
const SECONDS = 1000;

export default function CountdownTimer() {
	const [countdown, setCountdown] = useState(0);
	const { machineState, setMachineState } = useContext(
		VendingMachineStateContext
	);
	const intervalRef = useRef<number | null>(null);

	useEffect(() => {
		if (machineState.funds > 0) {
			reStartCountdown();
		}
	}, [machineState.funds]);

	useEffect(() => {
		if (machineState.state === 'selection') {
			startCountdown();
		} else if (machineState.state === 'dispense') {
			resetCountdown();
		} else if (machineState.state === 'idle') {
			stopCountdown();
		}
	}, [machineState.state]);

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
		setCountdown(0);
		setMachineState({ funds: 0, state: 'idle' });
	};

	const resetCountdown = () => {
		clearCountdown();
		setCountdown(0);
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
