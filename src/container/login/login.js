import React from 'react';
import Logo from '../../components/logo/logo';
import {InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import {login} from '../../redux/user.redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

@connect(
  state => state.user,
  {login}
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, v) {
    this.setState({
      [key]: v
    });
  }

  handleLogin() {
    this.props.login(this.state);
  }

  handleRegister() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
        <h2>我是登录页面</h2>
        <WingBlank>
          <div className="error-msg">{this.props.msg}</div>
          <InputItem onChange={(v) => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <br/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default withRouter(Login)