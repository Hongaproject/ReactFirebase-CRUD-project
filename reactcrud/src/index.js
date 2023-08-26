import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from './firebase';
console.log(firebase);

// firebase Web형태로 만들었음. 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

