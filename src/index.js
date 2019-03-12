import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import reducers from './reducer';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRouter from './components/authrouter';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f
));
function Boss() {
  return (
    <div>Boss</div>
  )
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter></AuthRouter>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/boss' component={Boss}></Route>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

