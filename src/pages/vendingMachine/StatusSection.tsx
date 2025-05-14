import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { millisecondsToSeconds } from 'framer-motion';
import { StateContext } from './VendingMachineContextProvider';
import SuperBigText from './components/SuperBigText';

const RESET_COUNTDOWN_TIME = 10000;

export default function StatusSection() {
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
			<Divider />
			<CardBody className='flex flex-row justify-between gap-2'>
				<SuperBigText size='md' position='center'>
					{machineState.state.toUpperCase()}
				</SuperBigText>
				<SuperBigText size='md' position='center'>
					{millisecondsToSeconds(countdown)}
				</SuperBigText>
			</CardBody>
		</Card>
	);
}
