import { useState } from "react";
// src로 시작되는 걸 모를때 연결시 
// import AppRouter from "./Router";
// import fbase from "../fbase";

// jsconfig.json파일에서 src로 시작되는 것을 알게 됨.
import AppRouter from "components/Router";
import fbase, { authService } from "fbase";

function App() {

  // const auth = fbase.auth(); // 이렇게도 사용 가능 하지만 firebase 부분에서 직접 사용을 하여 import시켜 사용할거임.
  console.log(authService.currentUser); // null이 나옴
  const [islogin, setLogin] = useState(authService.currentUser); // 유저 로그인 여부를 알 수 있게 됨. 

  return (
    <div>
      <AppRouter islogin={islogin}/>
      <footer>&copy; {new Date().getFullYear()} HSW All Rights Reserved.</footer>
    </div>
  );

}

export default App;
