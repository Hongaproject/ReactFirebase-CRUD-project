import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from './fbase';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
console.log(firebase);

// firebase Web형태로 만들었음. 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>

  // <React.StrictMode> // 원래 초기 상태인데 페이지 이동에 호환성 문제로 인해 지움
  
);

