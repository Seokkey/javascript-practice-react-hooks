
/**
 * middleware
 *
 * 미들웨어는 결국 하나의 함수이다 근데 이제.. 함수를 연달아서 두번 리턴하는 *
 * 첫번째 파라미터 store는 리덕스 스토어 인스턴스
 * 두번째 next 는 액션을 다음 미들웨어에게 전달하는 함수
 *  - 다음 미들웨어가 없다면 리듀서에게 액션을 전달해준다. 만약에 next 를 호출하지 않게 된다면 액션이 무시처리되어 리듀서에게로 전달되지 않음
 * 세번째 action 은 현재 처리하고 있는 액션 객체
 *  - 액션 값을 객체가 아닌 함수도 받아오게 만들어서 액션이 함수타입이면 이를 실행시키게끔 할 수도 있다
 * */
const myLogger = store => next => action => {
  console.log(action); // 액션 출력
  const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달

  // 업데이트 이후의 상태를 조회
  console.log('\t', store.getState()); // '\t' 는 탭 문자

  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물 기본: undefined
};

export default myLogger;


// 미들웨어는 Arrow 표현 식 없이 이렇게도 표현 가능
// function middleware(store) {
//   return function (next) {
//     return function (action) {
//       // 하고 싶은 작업...
//     };
//   };
// };



