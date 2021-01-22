import React, {useEffect} from 'react';
import produce from 'immer';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  /**
   * useEffect
   * 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열(deps)을 넣는다.
   *
   * 컴포넌트 마운트 시 EX)
   * deps 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect 에 등록한 함수가 호출 (componentDidMount랑 동일한듯)
   * 1. props 로 받은 값을 컴포넌트의 로컬 상태로 설정
   * 2. 외부 API 요청 (REST API 등)
   * 3. 라이브러리 사용 (D3, Video.js 등...)
   * 4. setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약
   *
   * 컴포넌트 언마운트 시 EX)
   * useEffect 에서는 함수를 반환 할 수 있는데 이를 cleanup 함수라고 부른다.
   * deps 가 비어있는 경우에는 컴포넌트가 사라질 때 cleanup 함수가 호출 (componentDidUnmount랑 동일한듯)
   * 1. setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
   * 3. 라이브러리 인스턴스 제거
   *
   * 컴포넌트 업데이트 시 EX)
   * deps 에 특정 값을 넣게 된다면,
   * 1. 컴포넌트 마운트 시 호출됨, cleanup함수 호출 안됨
   * 2. 컴포넌트 언마운트 시 호출됨, cleanup함수만 호출됨
   * 3. 컴포넌트 변경 시 변경되기전 props 값을 포함한 cleanup함수가 먼저 호출되고 변경 된 값을 가진 useEffect가 새로 호출됨
   *
   * useEffect 안에서 사용하는 상태나, props 가 있다면, useEffect 의 deps 에 넣어주어야 한다.
   * 리액트 컴포넌트는 기본적으로 부모컴포넌트가 리렌더링되면 자식 컴포넌트는 바뀐 내용이 없다 할지라도 리렌더링 된다.
   * 기존의 내용을 그대로 사용하면서 Virtual DOM 에 렌더링 하는 리소스를 아낄 수도 있음
   * */
  useEffect(() => {
    console.log('user 값이 설정됨', user);
    return () => {
      console.log('user 가 바뀌기 전..', user);
    };
  }, [user]);

  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

// React.memo() : props 가 바뀌지 않았다면 리렌더링을 방지, 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정
// 렌더링 최적화 하지 않을 컴포넌트에 React.memo 를 사용하는것은, 불필요한 props 비교만 하는 것이기 때문에 실제로 렌더링을 방지할수있는 상황이 있는 경우에만 사용
// React.memo 에서 두번째 파라미터에 propsAreEqual 이라는 함수를 사용하여 특정 값들만 비교 하여 렌더링 하는 것도 가능 (함수형 업데이트로 전환 필수)
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
);