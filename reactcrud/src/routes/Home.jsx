/* eslint-disable no-unused-expressions */
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
        // 공식문서에서 get에서 forEach를 사용할 수 있어 data를 확인 함.
        dbTexts.forEach((document) => {
            console.log(document.data()); // state안에 있는 data를 콘손로 확인 하는 코드

            setTexts((prev) => { 
                // setTexts에 값이 아닌 함수를 넣어 사용함.
                // set을 함수로 사용하면 이전값에 접근할 수 있음. 
                // dbTexts안에 있는 모든 doc에 대해 배열 리턴을 시킴 최신 순으로 나타 나게됨.
                [document.data(), ...prev] // 새로 작성한 내용과, 전에 작성된 내용을 배열 리턴시킴.
            }) 
        })
    }
    useEffect(() => {
        getTexts();
    }, []);

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
