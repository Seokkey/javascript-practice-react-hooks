import React from 'react';

function Hello({color, name, isSpecial}) {
  return (
    <div style={{ color }}>
      { isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

// 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel 이 JSX 를 JavaScript 로 변환해줌
// Babel 은 자바스크립트의 문법을 확장해주는 도구
// 아직 지원되지 않는 최신 문법이나, 편의상 사용하거나 실험적인 자바스크립트 문법들을 정식 자바스크립트 형태로 변환해서 구형 브라우저에서도 동작하게 한다.

Hello.defaultProps = {
  name: '이름없음'
};

export default Hello;