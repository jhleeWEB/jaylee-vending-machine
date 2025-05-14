import { useContext, useEffect, useState } from 'react';
import { StateContext } from './ContextProvider';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { millisecondsToSeconds } from 'framer-motion';

const RESET_COUNTDOWN_TIME = 10000;

export default function StateDisplay() {
	const { machineState, setMachineState } = useContext(StateContext);
	const [countdown, setCountdown] = useState(0);
	const [startCountdown, setStartCountdown] = useState(false);

	useEffect(() => {
		if (machineState.state === 'selection') {
			setStartCountdown(true);
			setCountdown(RESET_COUNTDOWN_TIME);
		} else {
			setStartCountdown(false);
			setCountdown(RESET_COUNTDOWN_TIME);
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
			setStartCountdown(false);
			clearInterval(countdownId);
		}

		return () => {
			clearInterval(countdownId);
		};
	}, [countdown, startCountdown]);

	return (
		<Card className='min-h-fit'>
			<CardHeader className='text-3xl font-bold'>Status</CardHeader>
			<CardBody className='flex flex-row justify-between gap-2'>
				<p className='w-full text-2xl text-center font-bold bg-gray-100 rounded-lg p-4'>
					{machineState.state}
				</p>
				<p className='w-1/4 text-2xl text-center font-bold bg-gray-100 rounded-lg p-4'>
					{millisecondsToSeconds(countdown)}
				</p>
			</CardBody>
		</Card>
	);
}
