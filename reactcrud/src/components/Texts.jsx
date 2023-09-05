
function Texts ({userObj, userData}) {
// userData를 Home에서 props받아 text부분과 userID가 일치한다면 수정 및 삭제를 할 수 있게 함.

    return(
        <div>
            <h4>{userObj.text}</h4>
            { userData && (
                <>
                    <button>삭제</button>
                    <button>수정</button>
                </>
            )}
        </div>
    );
}

export default Texts;