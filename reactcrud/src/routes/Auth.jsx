// //function component
// export default () => <span>Auth</span>

import { authService } from "fbase";
import { useState } from "react";

function Auth () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);

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
        if(newAccount){
            // true시 회원가입
            await authService.createUserWithEmailAndPassword(email,password);
            // firebaseAuth문서에 createUserWithEmailAndPassword부분에 promise를 사용하라고 적혀있어 async와 await사용 함.
        } else{
            // false시 로그인
            await authService.signInWithEmailAndPassword(email,password);
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" value={email} required onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" value={password} required onChange={onChange}/>
                <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
            </form>
            <div>
                <button>google</button>
                <button>github</button>
            </div>
        </div>
    );
}

export default Auth;
