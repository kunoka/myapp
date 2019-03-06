import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import store from './store';

function Erying() {
  return (
    <h2>二营</h2>
  )
}

function Qibinglian() {
  return (
    <h2>骑兵连</h2>
  )
}

class Test extends React.Component {

  render() {
    console.log(this.props);

    return(
      <div>Test Component {this.props.match.params.location}</div>
    )
  }
}
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">一营</Link>
          </li>
          <li>
            <Link to="/erying">二营</Link>
          </li>
          <li>
            <Link to="/qibinglian">骑兵连</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={App}></Route>
          <Route path="/erying" component={Erying}></Route>
          <Route path="/qibinglian" component={Qibinglian}></Route>
          <Route path="/:location" component={Test}></Route>
        </Switch>
      </div>
    </BrowserRouter>

  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
