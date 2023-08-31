import { useEffect, useState } from "react";
// src로 시작되는 걸 모를때 연결시 
// import AppRouter from "./Router";
// import fbase from "../fbase";

// jsconfig.json파일에서 src로 시작되는 것을 알게 됨.
import AppRouter from "components/Router";
import fbase, { authService } from "fbase"; // firebase 부분에서 직접 사용을 하여 import시켜 사용할거임.

function App() {
  const [init, setInit] = useState(false); 

  // const auth = fbase.auth(); // 이렇게도 사용 가능 하지만 firebase 부분에서 직접 사용을 하여 import시켜 사용할거임.
  console.log(authService.currentUser); // null이 나옴
  const [islogin, setLogin] = useState(authService.currentUser); // 유저 로그인 여부를 알 수 있게 됨. 
  // 즉시 실행이 이루어지기 때문에 로그인이된 건지 로그아웃이된 건지 잘 모름
  setInterval(() => {
    console.log(authService.currentUser);
  }, 2000); // setInterval을 사용하기 전에는 null로 찍힘 interval을 사용 후 유저가 나타남.

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
    })
  }, []);

  return (
    <div>
      <AppRouter islogin={islogin}/>
      <footer>&copy; {new Date().getFullYear()} HSW All Rights Reserved.</footer>
    </div>
  );

}

export default App;
