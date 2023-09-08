// 강의서 react-router-dom 5.3.0 버전을 사용해서 사용.
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Router을 받아와야해서 function Router으로 만들면 중복으로 인식해서 오류가 발생
const AppRouter = ({ updateUser ,islogin, userObj }) => {
    // 로그인 여부에 따라 달라지게 만듬
    // Router 파일은 routes부분만 보여주기 위해 사용하려고 App파일서 islogin을 props로 받아 옴.
    return(
        <Router>
            {islogin && <Navigation userObj={userObj} />} {/* 로그인시에 만 보임. */}
            <Switch>
                {/* Warning: React does not recognize the `computedMatch` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `computedmatch` instead. If you accidentally passed it from a parent component, remove it from the DOM element. */}
                {/* 오류시 div말고 Fragment태그 사용 */}
                {islogin ? (
                <> 
                    <Route exact path="/">
                         {/* 로그인이 되어있으면 HOME화면을 보여 줌 */}
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                         {/* 로그인이 되어있으면 Profile화면을 보여 줌 */}
                        <Profile userObj={userObj} updateUser={updateUser}/>
                    </Route>
                    <Redirect from="*" to="/" /> {/* "/"에 있으면 상관이 없는데 /말고 다른곳에 있으면 "/"로 돌아가게 한다는 뜻 */}
                </>
                ) : (
                <div>
                    <Route exact path="/">
                    {/* useState를 false로 넣어 로그인이 안된 상태로 만들어 둠 
                        로그인이 안되어 있으면 로그인 창을 보여지게 함 */}
                        <Auth />
                    </Route>
                    <Redirect from="*" to="/" /> {/* "/"에 있으면 상관이 없는데 /말고 다른곳에 있으면 "/"로 돌아가게 한다는 뜻 */}
                </div>
                    
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
