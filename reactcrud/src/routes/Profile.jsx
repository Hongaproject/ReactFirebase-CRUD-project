// //function component
// export default () => <span>Auth</span>

import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile ({ userObj }) {

    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }

    // const getTexts = async () => {
    //     // profile은 유저가 누군지 모름 그래서 지정을 해줘야 함.
    //     const texts = await dbService.collection("texts").where("createId", "==", userObj.uid).orderBy("create").get(); // 내 정보를 가져 옴
    //     console.log(texts.docs.map(doc=>doc.data()));
    // }
    // useEffect(() => {
    //     getTexts();
    // }, []); 

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);

        // setDisplayName(e.target.value); 
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // 프로필 이름을 업데이트 시켜줌.
        if(userObj.displayName !== newDisplayName){
            // console.log(userObj.updateProfile);
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
        }
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="닉네임" onChange={onChange} value={newDisplayName}/>
                <input type="submit" value="업데이트" />
            </form>
            <button onClick={onLogoutClick}>로그아웃</button>
        </div>
    );
}

export default Profile;
