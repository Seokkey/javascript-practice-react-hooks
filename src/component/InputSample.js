import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  /**
   * 1. const nameInput = useRef(); 를 사용하여 Ref 객체 생성
   * 2. 이 객체를 선택하고 싶은 DOM 에 ref 값으로 설정 ref={nameInput}
   * 3. Ref 객체의 nameInput.current 값이 해당 DOM 을 가리킴
   * */
  const nameInput = useRef();

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  /**
   * 이벤트에 등록하는 함수에서는 이벤트 객체 e 를 파라미터로 받아와서 사용 할 수 있는데
   * 이 객체의 e.target 은 이벤트가 발생한 DOM 인 input DOM 을 가르키게된다.
   * input DOM 의 value 값, 즉 e.target.value 를 조회하면 현재 input 에 입력한 값이 무엇인지 알 수 있다.
   * */
  const onChange = (e) => {
    // input 에 name 을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 방식
    // 우선 e.target 에서 name 과 value 를 추출
    const { value, name } = e.target;

    // 리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고,
    // 기존 객체는 불변성으 유지하되 새로운 객체를 만들어서, 새 객체에 변화를 주어야 된다.
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    });
    nameInput.current.focus();
  };


  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput} />
      <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;