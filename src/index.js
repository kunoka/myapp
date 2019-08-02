import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reducers from './reducer';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import Dashboard from './container/dashboard';
import Chat from './container/chat';
import AuthRouter from './components/authrouter';
import './index.css';
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter />
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
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

