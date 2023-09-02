// //function component
// export default () => <span>Auth</span>

import { dbService } from "fbase";
import { useEffect, useState } from "react";

function Home () {

    const [text, setText] = useState("");
    const [texts, setTexts] = useState("");
    // promise로 받아 async, await를 꼭 사용해야 함.
    const getTexts = async () => {
        const dbTexts = await dbService.collection("texts").get(); 
        // Home부분에서 텍스트를 작성하면 DB로 자동으로 내용이 저장되고 그 내용을 보여주기위해 사용되는 코드
        console.log(texts); 
    }
    useEffect(() => {

    })

    const onChange = (e) => {
        const {target: {value}} = e;
        setText(value);

        // setText(e.target.value); // 위에 꺼와 같음.
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        // firebaseDB는 collection과 document로 구성이 되어 사용이 됨.
        dbService.collection("texts").add({ 
        // collection에 texts라는 이름을 넣어줌
        // add는 document에 자동으로 data값을 넣어 줌.
        text,
        create: Date.now(),
        })
        setText(""); // text값을 받아 create에 넘겨준다.
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
                <input type="submit" value="등록" />
            </form>
        </div>
    );
}

export default Home;
