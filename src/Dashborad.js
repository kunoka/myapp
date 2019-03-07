import React from 'react';
import {connect} from 'react-redux';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import App from './App';
import {login, logout} from './Auth.redux';

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

@connect(
  state => ({auth: state.auth}),
  {login, logout}
)

class Dashborad extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const app = <div>
      <ul>
        <li>
          <Link to="/dashboard/">一营</Link>
        </li>
        <li>
          <Link to="/dashboard/erying">二营</Link>
        </li>
        <li>
          <Link to="/dashboard/qibinglian">骑兵连</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/dashboard/" exact component={App}></Route>
        <Route path="/dashboard/erying" component={Erying}></Route>
        <Route path="/dashboard/qibinglian" component={Qibinglian}></Route>
      </Switch>
    </div>;
    const loginComponent = <Redirect to="/login"/>;
    const isAuth = this.props.auth.isAuth;
    return isAuth ? app : loginComponent

  }
}

export default Dashborad;