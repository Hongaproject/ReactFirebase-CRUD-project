// //function component
// export default () => <span>Auth</span>

import { authService } from "fbase";

function Profile () {

    const onLogoutClick = () => {
        authService.signOut();
    }
    return(
        <div>
            <button onClick={onLogoutClick}>로그아웃</button>
        </div>
    );
}

export default Profile;
