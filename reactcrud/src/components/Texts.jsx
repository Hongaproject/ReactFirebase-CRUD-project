import { dbService } from "fbase";
import { useState } from "react";

function Texts ({userObj, userData}) {
// userData를 Home에서 props받아 text부분과 userID가 일치한다면 수정 및 삭제를 할 수 있게 함.

    const [edit, setEdit] = useState(false); // 수정모드인지 아닌지를 알기 위해 사용
    const [newText, setNewText] = useState(userObj.text); // input에 입력된 text를 업데이트 시켜줌. 

    const onDelete = () => { // async,await를 사용 할 수 있다.
        const deleteAlert= window.confirm("삭제 하시겠습니까?");
        console.log(deleteAlert); 
        if(deleteAlert){
            dbService.doc(`texts/${userObj.id}`).delete(); 
            // firebase는 폴더 구조로 되어있음 
        }
    }

    const onEdit = () => {
        setEdit((prev) => !prev);
    }

    const onChange = (e) => {
        const {target: {value}} = e;
        setNewText(value);

        // setNewText(e.target.value); // 같다.
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dbService.doc(`texts/${userObj.id}`).update({
            text: newText,
        }); 
        setEdit(false);
    }

    return(
        <div>
            { edit ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input text="text" placeholder="내용 수정 가능합니다." value={newText} required onChange={onChange} />
                        <input type="submit" value="업데이트" />
                    </form>
                    <button onClick={onEdit}>취소</button>
                </>
                ) : (
                <>
                    <h4>{userObj.text}</h4>
                    {userObj.filesUrl && <img src={userObj.filesUrl} width="50px" height="50px" /> }
                    {/* userObj에 글이 작성이 되기 때문에 filesUrl를 userObj안으로 넣어야지 나타남. &&를 사용해서 있을때만 나타나게 함.*/}
                    { userData && (
                        <>
                            <button onClick={onDelete}>삭제</button>
                            <button onClick={onEdit}>수정</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Texts;