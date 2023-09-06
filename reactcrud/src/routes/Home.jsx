/* eslint-disable no-unused-expressions */
// //function component
// export default () => <span>Auth</span>

import Texts from "components/Texts";
import { dbService, storageService } from "fbase";
// import { query, getDocs, collection } from "firebase/firestore"; // 최신버전 코드
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Home ({ userObj }) {

    const [text, setText] = useState("");
    const [texts, setTexts] = useState([]);
    const [fileUrl, setFileUrl] = useState();
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

    const onSubmit = async (e) => {
        // createId부분이 없이 사용하면 누구인지 모르고 익명으로만 사용을 하게 됨.
        e.preventDefault();
        let filesUrl = ""; // 사진이 없다면 string으로 받는다.
        if(fileUrl != ""){ // 사진이 있다면 밑에 코드를 진행시킨다.
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // storage에 이미지 파일을 생성하게 함. uuid는 랜덤으로 id를 생성해줌.
            const response = await fileRef.putString(fileUrl, "data_url"); // 이미지 URL을 가져와준다.
            filesUrl = await response.ref.getDownloadURL();
            // const filesUrl = await response.ref.getDownloadURL(); // 이미지 URL을 만들어서 URL클릭시 사진을 볼 수 있게 해줌.
            // const filesUrl는 if안에서만 적용이되어 오류가 발생이됨 그래서 밖에 let을 사용해서 const를 빼고 업데이트를 시켜줌.
            }
            const addText = { // 이미지와 함께 글 생성을 하기 위해 코드를 짬.
                text: text,
                create: Date.now(),
                createId: userObj.uid,
                filesUrl
            }
            dbService.collection("texts").add(addText);
            setText("");
            setFileUrl("");

        // 사진을 첨부하여 글을 쓸 때
        // const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // storage에 이미지 파일을 생성하게 함. uuid는 랜덤으로 id를 생성해줌.
        // const response = await fileRef.putString(fileUrl, "data_url"); // 이미지 URL을 가져와준다.
        // const filesUrl = await response.ref.getDownloadURL(); // 이미지 URL을 만들어서 URL클릭시 사진을 볼 수 있게 해줌.

        // const addText = { // 이미지와 함께 글 생성을 하기 위해 코드를 짬.
        //     text: text,
        //     create: Date.now(),
        //     createId: userObj.uid,
        //     filesUrl
        // }
        // dbService.collection("texts").add(addText);
        // setText("");
        // setFileUrl("");
        
        // console.log(await response.ref.getDownloadURL()); // getDownloadURL을 사용하면 사진 URL을 이용하여 사진을 볼 수 있다. 

        // firebaseDB는 collection과 document로 구성이 되어 사용이 됨.
        // dbService.collection("texts").add({ 
        // // collection에 texts라는 이름을 넣어줌
        // // add는 document에 자동으로 data값을 넣어 줌.
        // text: text,
        // create: Date.now(),
        // createId: userObj.uid, // 로그인 된 유저 아이디를 알려 줌.
        // })
        // setText(""); // text값을 받아 create에 넘겨준다.
    }

    // console.log(texts); // db내용을 보여주기 위해 콘솔로 확인중

    const onFileChange = (e) => { // 글에 파일을 추가 할 수 있게 만들어 줌.
        const {target: {files}} = e;
        console.log(e.target.files);

        const theFile = files[0];
        console.log(theFile);

        // fileReader API를 받아와서 사용 함. 
        const reader = new FileReader(); // 파일을 받아와 reader을 생성하고
        reader.onloadend = (finishEvent) => {
            console.log(finishEvent);
            const {currentTarget: {result},} = finishEvent;
            setFileUrl(result);

            // setFileUrl(finishEvent.currentTarget.result); // 같음
        }
        reader.readAsDataURL(theFile); // readAsDataURL울 사용해서 파일을 읽음.
    }

    const onClearPhoto = () => {
        setFileUrl(null);
    }

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
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="등록" />
                {fileUrl && (
                    <div>
                        <img src={fileUrl} width="50px" height="50px" />
                        <button onClick={onClearPhoto}>이미지 삭제</button>
                    </div>
                )}
            </form>
            <div>
                {texts.map((text) => (
                    <Texts key={text.id} userObj={text} userData={text.createId === userObj.uid} />
                ))}
            </div>
        </div>
    );
}

export default Home;
