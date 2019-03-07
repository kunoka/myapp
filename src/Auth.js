import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login, logout} from './Auth.redux';
@connect(
  state=>({auth: state.auth}),
  {login, logout}
)

class Auth extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('this.props.auth.isAuth');
    console.log(this.props.auth.isAuth);
    return(
      <div>
        <h2>
          {this.props.auth.isAuth ? <Redirect to='/dashboard' />: null}
          你没有权限，需要登陆才能看
          <div>
            <button onClick={this.props.login}>登陆</button>

          </div>
        </h2>
      </div>

    )
  }
}

export default Auth