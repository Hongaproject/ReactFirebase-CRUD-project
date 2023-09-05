/* eslint-disable no-unused-expressions */
// //function component
// export default () => <span>Auth</span>

import Texts from "components/Texts";
import { dbService } from "fbase";
// import { query, getDocs, collection } from "firebase/firestore"; // 최신버전 코드
import { useEffect, useState } from "react";

function Home ({ userObj }) {

    const [text, setText] = useState("");
    const [texts, setTexts] = useState([]);
    // promise로 받아 async, await를 꼭 사용해야 함.
    // const getTexts = async () => {
    //     // 최신버전 코드
    //     // const dbTexts  = await getDocs(collection(dbService, "texts"));
    //     // const q = query(collection(dbService, 'texts'))
    //     // const dbTexts = await getDocs(q);

    //     const dbTexts = await dbService.collection("texts").get(); 
    //     console.log(texts); // Home부분에서 텍스트를 작성하면 DB로 자동으로 내용이 저장되고 그 내용을 보여주기위해 사용되는 코드 
        
    //     // 공식문서에서 get에서 forEach를 사용할 수 있어 data를 확인 함.
    //     dbTexts.forEach((document) => {
    //         console.log(document.data()); // state안에 있는 data를 콘솔로 확인 하는 코드
            
    //         //document.data를 객체로 만들어서 id를 넣어 보여주기 위한 코드
    //         const textObject = {
    //             ...document.data(), // spread문법 복사를 해줌.
    //             id: document.id,
    //         };

    //         setTexts((prev) => 
    //             // setTexts에 값이 아닌 함수를 넣어 사용함. set을 함수로 사용하면 이전값에 접근할 수 있음. 
    //             // dbTexts안에 있는 모든 doc에 대해 배열 리턴을 시킴 최신 순으로 나타 나게됨.
    //             // [document.data(), ...prev] // 새로 작성한 내용과, 전에 작성된 내용을 배열 리턴시킴.
    //             [textObject, ...prev]  // dacument.data를 객체로 받아와 id를 추가시켜 내용을 보여줌.
    //         ); 
    //         // prev is not iterable TypeError: prev is not iterable오류가 나오면 {}확인해 보기.
    //     });
    // }

    useEffect(() => {
        // getTexts(); // forEach문과 map을 선택해서 사용 가능.

        dbService.collection("texts").onSnapshot((snapshot) => {
            // console.log("CRUD"); // 첫 번째로는 그냥 나오지만 두 번째 부터는 읽거나 수정 및 삭제를 할 때 나타난다.
            // snapshot을 이용하면 실시간으로 화면에 보여진다. 
            const textShow = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTexts(textShow);
        });
    }, []);


    const onChange = (e) => {
        const {target: {value}} = e;
        setText(value);

        // setText(e.target.value); // 위에 꺼와 같음.
    }
    
    // 최신버전 코드 
    // const onSubmit = async (event) => {
    //     event.preventDefault();

    //     await addDoc(collection(dbService, "texts"), {
    //     text,
    //     create: Date.now(),
    //     });
    //     setText("");
    //     };

    const onSubmit = (e) => {
        // 이렇게 사용하먄 누구인지 모르고 익명으로만 사용을 하게 됨.
        e.preventDefault();
        // firebaseDB는 collection과 document로 구성이 되어 사용이 됨.
        
        dbService.collection("texts").add({ 
        // collection에 texts라는 이름을 넣어줌
        // add는 document에 자동으로 data값을 넣어 줌.
        text: text,
        create: Date.now(),
        createId: userObj.uid, // 로그인 된 유저 아이디를 알려 줌.
        })
        setText(""); // text값을 받아 create에 넘겨준다.
    }

    console.log(texts); // db내용을 보여주기 위해 콘솔로 확인중


    return(
        <div>
            <h1>로그인이 되었습니다.</h1>
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
            <div>
                {texts.map((text) => (
                    <Texts key={text.id} userObj={text}/>
                ))}
            </div>
        </div>
    );
}

export default Home;
