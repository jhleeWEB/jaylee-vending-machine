# Jaylee Vending Machine

<img src="https://img.shields.io/badge/^6.3.5-Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/^19.0.0-React-61DAFB?style=flat-square&logo=React&logoColor=white&"/> <img src="https://img.shields.io/badge/~5.8.3-Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/^3.4.17-Tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/> <img src="https://img.shields.io/badge/^2.7.0-HeroUI-000000?style=flat-square&logo=nextui&logoColor=white"/>

<a href="https://jhleeweb.github.io/jaylee-vending-machine/">
 JayLee-Vending-Machine Github Page
</a>

## 목차

- [**목차**](#목차)
- [**소개**](#소개)
- [**설치 방법**](#설치-방법)
- [**라이브러리**](#라이브러리)
- [**동작 방식**](#동작-방식)
- [**주요 로직**](#주요-로직)

## 소개

안녕하세요. 이중훈 자판기입니다.

자판기의 종류도 다양하고 작동 방식도 제각각이라 저는 요구사항을 모두 충족하면서 발생할 수 있는 다양한 예외 상황과 디자인 요소까지 고려해 자판기를 구현했습니다.
자판기를 사용하면서 자판기의 동작 방식을 보다 쉽게 이해할 수 있도록 몇 가지 기능을 추가했습니다.

이 README에서는 해당 저장소의 실행 방법, 상세 설명, 사용한 라이브러리 등을 통해 자판기를 어떻게 기획하고 구현했는지 설명드리겠습니다.

## 설치 방법

`node.js` 버전 20 이상 권장합니다.

```
npm install
npm run dev
```

## 라이브러리

#### UI

<img src="https://img.shields.io/badge/^2.7.0-HeroUI-000000?style=flat-square&logo=nextui&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>

높은 퀄리티로 빠르게 개발하기 위해 HeroUI를 사용했습니다. HeroUI는 Tailwind CSS를 기반으로 만들어져 Tailwind CSS의 작은 번들 사이즈와 성능 개선 등의 장점도 함께 얻을 수 있다고 판단해 최근 자주 사용하고 있습니다.

#### Framework

<img src="https://img.shields.io/badge/^6.3.5-Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/^19.0.0-React-61DAFB?style=flat-square&logo=React&logoColor=white&"/>

기존에는 Webpack 통해 리엑트 어플리케이션을 번들링했지만 Vite는 Rollup 기반으로 번들링하여 개발하는 데 있어 편리하여 사용했습니다. 개인적으로 CRA는 너무 커진 느낌인 반면에 Vite는 훨씬 가볍습니다.

#### 기타

<img src="https://img.shields.io/badge/~5.8.3-Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>

아직 Typescript를 능숙하게 다루지는 못하지만, 타입 추론 덕분에 개발이 훨씬 수월해졌고 컴파일 단계에서 타입 오류를 미리 확인할 수 있어 디버깅에도 많은 도움이 되었습니다.
any나 unknown을 과도하게 사용하지 않는 한 코드의 안정성을 높이는 데 큰 장점이 있다고 판단하여 적극적으로 활용하고 있습니다.

## 동작 방식

<img alt="user-flowchart" style="width:40%;" src="https://github.com/user-attachments/assets/62c5fc9f-d6e0-459e-b5d9-6b0b72fb6a9a"/>
<img alt="detail-flowchart" style="width:40%;" src="https://github.com/user-attachments/assets/8b91b8f3-4368-4626-a77d-09cf3f17e901"/>

_사용자 흐름 다이어그램_, _상세 흐름 다이어그램_

자판기는 간단한 로직으로 작동합니다. 기본적으로 사용자 입력이 없으면 idle 상태를 유지합니다.
사용자가 돈을 넣으면 제품 선택이 가능해지며, 자판기는 selection 상태로 전이됩니다.
이 상태에서는 초기화 제한 시간(10초) 이 주어지며, 시간이 초과되면 투입된 금액은 반환되고 자판기는 다시 idle 상태로 되돌아갑니다.

## 주요 로직

### 상태 관리

![image](https://github.com/user-attachments/assets/3a180762-65b4-4f0b-93c4-762900f5d25b)

관리해야 할 상태가 많고, 복잡하여 `useReducer()`를 사용하는 것이 가장 적합하다고 판단했습니다. 전역으로 제공되어야 하기 때문에 Context + Reducer를 조합하여 사용하기로 결정했습니다.

`<VendingMachineContextProvider/>` 하위 컴포넌트는 모두 `useVendingMachineContext()` 컴스텀 훅을 통해 상태 값을 전달 받고 수정 명령을 보내도록 했습니다.

**활용 예시:**

```typescript
// CardPayment.tsx

export default function CardPayment() {
	const { state, dispatch } = useVendingMachineContext();

	const onPressEjectCard = () => {
		dispatch({ type: 'EJECT_CARD' });
		dispatch({ type: 'TRANSITION_STATE', nextState: 'idle' });
	};

	return (
		// some other codes...

		<Button color='danger' onPress={onPressEjectCard}>
			Eject Card
		</Button>

		// some other codes...
	);
}
```

좀 더 직관적인 코드를 위해 `dispatch`의 action은 최대한 단순하게 작성했습니다. React에서는 `dispatch`가 반복되어 사용 될 경우 자동 배칭을 해주어 단순한 action을 사용하는데 도움이 되었습니다.

> **Note**
> (`useVendingMachineContext()`는 `createContext()`함수 선언 시 null 값은 인자로 넘겨주는데, 그럴게 했을 경우 context를 사용하는 모든 컴포넌트에서 null값 예외 처리를 해야하는 번거러움이 있어 커스텀 훅으로 만들어 null값 일 경우 애러를 던지도록 처리하여, 하위 컴포넌트에 유효한 값을 보장합니다.)

<hr/>

### 상태 전이 다이어그램

![image](https://github.com/user-attachments/assets/ce00f705-acb6-4a04-9056-5ea3c19922d1)

세 가지 상태에 따라 특정 요소가 활성화되며, 이에 따라 UI가 렌더링됩니다.

**idle**: 자판기가 대기 중인 상태로 사용자 입력을 기다립니다. 이 상태에서는 결제 방식 선택 및 현금/카드 삽입이 가능합니다.

**selection**: 카드나 현금이 감지되면 제품 선택 상태인 selection 상태로 전이됩니다. 이 상태에서는 잔액 확인, 카드/현금 제거 등 구매를 위한 검증 절차가 진행되며 제한 시간 내에 제품을 선택해야 합니다.

**ignore**: 자판기가 사용자 입력을 일시적으로 무시하는 상태입니다. 비동기 요청 처리나 제품 배분 중 사용자 입력을 제한해야 할 때 이 상태로 진입합니다.

<hr/>

### 예외 케이스 처리

자판기를 구현하면 많은 예외 케이스가 발생합니다.
간단한 기능을 추가하면서 번거로울 수 있는 예외 케이스를 처리하면서 동시에 사용자 겸험도 높혔습니다.

**잔액/재고에 의한 제품 버튼 활성화 기능 추가**

- 잔액이 부족한 상태에서 제품을 뽑으려 했을때
- 재고가 없을때

**돈을 넣었을때 결제 방식 변경 불가능한 기능 추가**

- 현금을 넣고, 카드를 넣었을때(반대 일 경우)

**제품을 뽑을때 사용자 입력 차단하는 기능 추가**

- 제품 배분 및 결제 중 현금/카드를 뺐을때
- 제품 배분 및 결제 중 현금/카드를 넣었을때
- 여러 제품을 동시에 뽑으려 할때
- 제품을 연속으로 눌렀을때
- 재고가 없을때

**대기시간 초과 시 자동 반환되는 기능 추가**

- 현금/카드를 넣고 아무것도 하지 않을때

**제품을 뽑고 잔액이 남았다면 추가로 제품 뽑을 수 있는 기능 추가**

- 여러 제품을 뽑고 싶을때
