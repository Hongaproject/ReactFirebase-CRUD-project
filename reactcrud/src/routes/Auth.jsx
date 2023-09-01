// //function component
// export default () => <span>Auth</span>

import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

function Auth () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        // e로 부터 target을 받아오고 name,value를 받아온다.
        const {target: {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
            // true시 회원가입
                data = await authService.createUserWithEmailAndPassword(email,password); // 사용자 계정 생성
            // firebaseAuth문서 createUserWithEmailAndPassword부분에 promise를 사용하라고 적혀있어 async와 await사용 함.
            } else{
            // false시 로그인
                data = await authService.signInWithEmailAndPassword(email,password); // 사용자 로그인
            // firebaseAuth문서 signInWithEmailAndPassword부분에 promise를 사용하라고 적혀있어 async와 await사용 함.

            }
            console.log(data);
        } catch(error){
            setError(error.message);
        }
        
    }

    /** 원래 계정이 있을시 로그인하기 글을 누르면 아이디와 비밀번호를 치고 로그인 가능
        계정이 없을시 회원가입하기 글을 누르면 아이디와 비밀번호를 치고 회원가입 가능 */
    const toggleAccount = () => {
        setNewAccount((prev) => !prev); // newAccount의 반대 값을 받아온다.
    } 

    const onSocialClick = async (event) => {
        // console.log(event.target.name); // 확인용으로 사용
        const {target: {name}} = event; // event서 target을 받아오고 name을 받아 옴.

        let provider; // signInWithPopup공식 문서에서  사용함 
        if(name === "google"){ // google클릭시 로그인 하겠냐는 창이 나옴
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "github"){ // github클릭시 로그인 하겠냐는 창이 나옴
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider); // google, github으로 로그인하기 구현하기
        console.log(data);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" value={email} required onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" value={password} required onChange={onChange}/>
                <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
                {error}
            </form>
            <button onClick={toggleAccount}>{newAccount ? "로그인하기" : "회원가입하기"}</button>
            {/* 코드처럼 아이디 비밀번호 옆에 회원가입이 있으면 밑에 로그인하기가 써 있음 반대로 보여줌 */}
            <div>
                <button name="google" onClick={onSocialClick}>google</button>
                <button name="github" onClick={onSocialClick}>github</button>
            </div>
        </div>
    );
}

export default Auth;
