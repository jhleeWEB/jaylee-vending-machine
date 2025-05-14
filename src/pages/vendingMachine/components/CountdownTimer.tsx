import { millisecondsToSeconds } from 'framer-motion';
import SuperBigText from './SuperBigText';
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../VendingMachineContextProvider';
import { addToast } from '@heroui/react';

const DEFAULT_COUNTDOWN_TIME = 10000;
const SECONDS = 1000;

export default function CountdownTimer() {
	const initialState = DEFAULT_COUNTDOWN_TIME;
	const [countdown, setCountdown] = useState(initialState);
	const [startCountdown, setStartCountdown] = useState(false);
	const { machineState, setMachineState } = useContext(StateContext);

	useEffect(() => {
		if (machineState.funds > 0) {
			reStart();
		}
	}, [machineState.funds]);

	useEffect(() => {
		if (machineState.state === 'selection') {
			start();
		}
	}, [machineState.state]);

	useEffect(() => {
		const countdownId = setInterval(() => {
			if (countdown >= 0 && startCountdown) {
				setCountdown((prev) => prev - SECONDS);
			}
		}, SECONDS);

		if (countdown <= 0) {
			stop();
		}

		return () => {
			clearInterval(countdownId);
		};
	}, [countdown, startCountdown]);

	const start = () => {
		setStartCountdown(true);
	};

	const stop = () => {
		setStartCountdown(false);
		setCountdown(initialState);
		setMachineState({ funds: 0, state: 'idle' });
		addToast({
			title: 'Timeout',
			description: 'Transitioning to idle state',
			variant: 'flat',
			color: 'default',
		});
	};
	const reStart = () => {
		setStartCountdown(true);
		setCountdown(initialState);
	};
	return (
		<SuperBigText size='md' position='center'>
			{millisecondsToSeconds(countdown)}
		</SuperBigText>
	);
}
