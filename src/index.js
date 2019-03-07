import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import store from './store';
import Auth from './Auth';
import Dashboard from './Dashborad';

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
      <Switch>
        <Route path='/login' component={Auth}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Redirect to='/dashboard' component={Dashboard}></Redirect>
      </Switch>
    </BrowserRouter>

  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
