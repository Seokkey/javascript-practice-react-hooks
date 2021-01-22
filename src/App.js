import React, {useRef, useState, useMemo, useCallback} from 'react';
import './App.css';
// import Hello from './component/Hello';
// import Wrapper from "./component/Wrapper";
// import Counter from "./component/Counter";
// import InputSample from "./component/InputSample";
import UserList from "./component/users/UserList";
import CreateUser from "./component/users/CreateUser";

// <></> : Fragment 는 브라우저 상에서 따로 별도의 엘리먼트로 나타나지 않는다
// useCallback, useMemo, React.memo 는 컴포넌트의 성능을 실제로 개선할수있는 상황에서만 하자
function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;

  /**
   * useCallback()
   * 기본적으로 함수들은 컴포넌트가 리렌더링 될 때 마다 새로 만들어진다다.
   * 함수를 선언하는 것 자체는 사실 메모리도, CPU 도 리소스를 많이 차지 하는 작업은 아니기 때문에
   * 함수를 새로 선언한다고 해서 그 자체 만으로 큰 부하가 생길일은 없지만,
   * 한번 만든 함수를 필요할때만 새로 만들고 재사용하는 것은 중요하다.
   *
   * 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함시켜야 된다.
   * 만약 넣지 않게 된다면, 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조 할 것이라고 보장 할 수 없음.
   * props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어줘야 한다.
   *
   * useCallback 은 useMemo 를 기반으로 만들어짐
   * const onToggle = useMemo(param => () => { ... },[users]);
   * */
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  /**
   * useRef() 를 사용 할 때 파라미터를 넣어주면, 이 값이 .current 값의 기본값이 된다.
   * 그리고 이 값을 수정 할때에는 .current 값을 수정하면 되고 조회 할 때에는 .current 를 조회하면 된다.
   * */
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };

    /**
     * 배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다.
     * 그렇기 때문에, 배열의 push, splice, sort 등의 함수를 사용하면 안된다.
     * 만약에 사용해야 한다면, 기존의 배열을 한번 복사하고 나서 사용해야된다.
     * 배열 복사 1: ... 연산자, 2: concat();
     * */
    // 1.spread 연산자를 사용한 배열 복사
    setUsers(users => users.concat(user));

    // 2. concat을 사용한 배열 복사
    // setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    id => {
      /**
       * 배열에 있는 항목을 제거할 때에는, 추가할떄와 마찬가지로 불변성을 지켜가면서 업데이트를 해줘야 한다.
       * Array.filter() : 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열 반환
       * */
      // users 에서 id 가 파라미터로 받아온 id와 같지 않은것만 반환 = 파라미터로 받아온 id 값, 배열에서 제거
      setUsers(users => users.filter(user => user.id !== id));
    }, [] );

  const onToggle = useCallback(
      id => {
      /**
       * 배열의 불변성을 유지하면서 배열을 업데이트 할 때에도 map 함수를 사용
       * */
      // id 값을 비교해서 id 가 다르다면 그대로 두고, 같다면 active 값을 반전
      setUsers(users =>
        users.map(user =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    }, []
  );

  const countActiveUsers = (users) => {
    console.log('활성 사용자 수를 세는중...');
    return users.filter(user => user.active).length;
  };

  /**
   * useMemo()
   * Memo 는 "memoized" 를 의미하는데, 이전에 계산 한 값을 재사용한다는 의미
   * useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수
   * 두번째 파라미터에는 deps 배열을 넣어준다.
   * deps 값이 변경되면 countActiveUsers() 호출
   * 바뀌지 않았다면 이전 값을 재사용
   * */
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;