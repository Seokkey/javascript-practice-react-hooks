import React, { useState, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  /**
   * useState() 사용
   * */
  // const [number, setNumber] = useState(0);
  // const onIncrease = () => {
  //   // 함수형 업데이트
  //   // setNumber 를 사용 할 때 그 다음 상태를 파라미터로 넣어준것이 아니라,
  //   // 값을 업데이트 하는 함수를 파라미터로 넣어줌
  //   setNumber(prevNumber => prevNumber + 1);
  // };
  // const onDecrease = () => {
  //   setNumber(prevNumber => prevNumber - 1);
  // };

  /**
   * useReducer() 사용
   * */
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;