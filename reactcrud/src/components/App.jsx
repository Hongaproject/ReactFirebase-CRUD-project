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
  // console.log(authService.currentUser); // null이 나옴

  // const [islogin, setLogin] = useState(false); // 유저 로그인 여부를 알 수 있게 됨.
  // 즉시 실행이 이루어지기 때문에 로그인이된 건지 로그아웃이된 건지 잘 모름
  // useState(authService.currentUser);를 useState(false);로 바꾸고 useEffect로 알려줌.

  // setInterval(() => { // useState(authService.currentUser);를 사용했을때 유저 확인용으로 테스트 한 코드 
  //   console.log(authService.currentUser);
  // }, 2000); // setInterval을 사용하기 전에는 null로 찍힘 interval을 사용 후 유저가 나타남.

  const [userObj, setUserObj] = useState(null); // authService과 바뀐다면 user부분에 setUserObj를 넣음.
  // 누가 작성했는지 알기위해 사용 함.
  // Router로 props하고 Home부분에 props하여 사용 함.

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user); // 유저 나타나는지 확인용
      if(user){
        // setLogin(true); // 로그인
        setUserObj({ // firebase의 특정 부분만 가져와서 react한테 줌
          displayName: user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }); // onAuthStateChanged를 작동시켜 user를 받음 
      }else{
        // setLogin(false); // 로그아웃
      }
      setInit(true); 
    })
  }, []);

  const updateUser = () => { // user 새로고침 기능
    // setUserObj(authService.currentUser);

    // 버그가 적음.
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <div>
      { init ? <AppRouter updateUser={updateUser} islogin={Boolean(userObj)} userObj={userObj} /> : "Loding..." }
      <footer>&copy; {new Date().getFullYear()} HSW All Rights Reserved.</footer>
    </div>
  );

}

export default App;
