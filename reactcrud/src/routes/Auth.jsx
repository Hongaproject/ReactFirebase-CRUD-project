// //function component
// export default () => <span>Auth</span>

import { useState } from "react";

function Auth () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (e) => {
        console.log(e.target.name);
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
