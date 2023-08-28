// //function component
// export default () => <span>Auth</span>

import { useState } from "react";

function Auth () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        // e로 부터 target을 받아오고 name,value를 받아온다.
        const {target: {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" value={email} required onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" value={password} required onChange={onChange}/>
                <input type="submit" value="Login" />
            </form>
            <div>
                <button>google</button>
                <button>github</button>
            </div>
        </div>
    );
}

export default Auth;
