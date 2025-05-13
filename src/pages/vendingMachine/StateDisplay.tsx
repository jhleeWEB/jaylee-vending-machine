import { useContext, useEffect, useState } from 'react';
import { StateContext } from './ContextProvider';
import { Card, CardBody } from '@heroui/react';

const RESET_COUNTDOWN_TIME = 10000;

export default function StateDisplay() {
	const { machineState, setMachineState } = useContext(StateContext);
	const [countdown, setCountdown] = useState(RESET_COUNTDOWN_TIME);
	const [startCountdown, setStartCountdown] = useState(false);

	useEffect(() => {
		if (machineState.state === 'selection') {
			setStartCountdown(true);
		}
	}, [machineState.state]);

	useEffect(() => {
		const countdownId = setInterval(() => {
			if (countdown >= 0 && startCountdown) {
				setCountdown((prev) => prev - 1000);
			}
		}, 1000);

		if (countdown === 0) {
			setMachineState({
				funds: 0,
				state: 'idle',
			});
			clearInterval(countdownId);
		}

		return () => {
			clearInterval(countdownId);
		};
	}, [countdown, startCountdown]);

	return (
		<Card>
			<CardBody>
				<p>{machineState.state}</p>
				<p>{countdown}</p>
			</CardBody>
		</Card>
	);
}
