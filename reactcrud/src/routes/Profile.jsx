// //function component
// export default () => <span>Auth</span>

import { authService } from "fbase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Profile () {

    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return(
        <div>
            <button onClick={onLogoutClick}>로그아웃</button>
        </div>
    );
}

export default Profile;
