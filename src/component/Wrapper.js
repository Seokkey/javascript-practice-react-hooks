import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {/*컴포넌트 태그 사이에 넣은 값을 조회하기 위해선 props.children 을 렌더링 해야한다*/}
      {children}
    </div>
  )
}

export default Wrapper;