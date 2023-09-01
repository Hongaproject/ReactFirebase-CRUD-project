// //function component
// export default () => <span>Auth</span>

import { useState } from "react";

function Home () {

    const [text, setText] = useState("");
    const onChange = (e) => {
        const {target: {value}} = e;
        setText(value);

        // setText(e.target.value); // 위에 꺼와 같음.
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="텍스트 입력" 
                    maxLength={120}
                    onChange={onChange} 
                    value={text}
                />
                <input type="submot" value="등록" />
            </form>
        </div>
    );
}

export default Home;
