//number 값(11000)을 "11,000 원"으로 재 포맷해주는 함수 입니다.
export default function formatToWon(value: number) {
	return `${value.toLocaleString()} 원`;
}
