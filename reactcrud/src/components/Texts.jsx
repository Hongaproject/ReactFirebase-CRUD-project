import { dbService } from "fbase";

function Texts ({userObj, userData}) {
// userData를 Home에서 props받아 text부분과 userID가 일치한다면 수정 및 삭제를 할 수 있게 함.

    const onDelete = () => { // async,await를 사용 할 수 있다.
        const deleteAlert= window.confirm("삭제 하시겠습니까?");
        console.log(deleteAlert); 
        if(deleteAlert){
            dbService.doc(`texts/${userObj.id}`).delete(); 
            // firebase는 폴더 구조로 되어있음 
        }
    }

    return(
        <div>
            <h4>{userObj.text}</h4>
            { userData && (
                <>
                    <button onClick={onDelete}>삭제</button>
                    <button>수정</button>
                </>
            )}
        </div>
    );
}

export default Texts;