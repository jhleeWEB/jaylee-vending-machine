interface Props extends React.PropsWithChildren {
	withBackground?: boolean;
	position?: 'left' | 'center' | 'right';
	size?: 'lg' | 'md' | 'sm';
}

const getTextSize = (size?: string) => {
	switch (size) {
		case 'lg':
			return 'text-5xl';
		case 'md':
			return 'text-3xl';
		default:
			return 'text-xl';
	}
};
const getTextPosition = (position?: string) => {
	switch (position) {
		case 'right':
			return 'text-right';
		case 'center':
			return 'text-center';
		default:
			return 'text-left';
	}
};

export default function SuperBigText(props: Props) {
	const { children, withBackground, position, size } = props;

	const textSize = getTextSize(size);
	const textPosition = getTextPosition(position);
	const background = withBackground ? 'bg-gray-100 rounded-lg' : '';

	return (
		<p
			className={`${textSize} ${background} ${textPosition} w-full font-bold p-4`}
		>
			{children}
		</p>
	);
}
