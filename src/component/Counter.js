import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    // 함수형 업데이트
    // setNumber 를 사용 할 때 그 다음 상태를 파라미터로 넣어준것이 아니라,
    // 값을 업데이트 하는 함수를 파라미터로 넣어줌
    setNumber(prevNumber => prevNumber + 1);
  }

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  }

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;