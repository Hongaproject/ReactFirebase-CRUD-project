// 강의서 react-router-dom 5.3.0 버전을 사용해서 사용.
import { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

// Router을 받아와야해서 function Router으로 만들면 중복으로 인식해서 오류가 발생
const AppRouter = ({ islogin }) => {
    // 로그인 여부에 따라 달라지게 만듬
    // Router 파일은 routes부분만 보여주기 위해 사용하려고 App파일서 islogin을 props로 받아 옴.
    return(
        <Router>
            {islogin && <Navigation />} {/* 로그인시에 만 보임. */}
            <Switch>
                {islogin ? (
                <div> 
                    <Route exact path="/">
                         {/* 로그인이 되어있으면 HOME화면을 보여 줌 */}
                        <Home />
                    </Route>
                    <Route exact path="/profile">
                         {/* 로그인이 되어있으면 Profile화면을 보여 줌 */}
                        <Profile />
                    </Route>
                </div>
                ) : (
                    <Route exact path="/">
                        {/* useState를 false로 넣어 로그인이 안된 상태로 만들어 둠 
                        로그인이 안되어 있으면 로그인 창을 보여지게 함 */}
                        <Auth />
                    </Route>
                )}

                {/* 윗 방법과 아래 방법이 같은 방식 */}
                {/* <Route exact path="/" >
                    {islogin ? <Home /> : <Auth />}
                </Route > */}
   
            </Switch>
        </Router>
    );
}

export default AppRouter;
