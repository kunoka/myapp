import React, {PureComponent} from 'react';
import AuthRouter from "./components/authrouter";
import {Route, Switch} from "react-router-dom";
import Login from "./container/login/login";
import Register from "./container/register/register";
import BossInfo from "./container/bossinfo";
import GeniusInfo from "./container/geniusinfo";
import Chat from "./container/chat";
import Dashboard from "./container/dashboard";

class App extends PureComponent {
  render() {
    return (
      <div>
        <AuthRouter/>
        {/*Switch包住的组件，只要匹配一个就返回*/}
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
