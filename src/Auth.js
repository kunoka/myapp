import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login, logout, getUserData} from './Auth.redux';
@connect(
  state=>({auth: state.auth}),
  {login, logout,getUserData}
)

class Auth extends Component {
  componentDidMount() {
    this.props.getUserData();
  }
  render() {
    return(
      <div>
        <h2>我的名字是{this.props.auth.user} 年龄{this.props.auth.age}</h2>
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