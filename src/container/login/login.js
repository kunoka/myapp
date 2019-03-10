import React from 'react';
import Logo from '../../components/logo/logo';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';

class login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this)

  }
  register() {
    this.props.history.push('/register');
  }
  render() {
    return (
      <div>
        <Logo></Logo>
        <h2>我是登录页面</h2>
        <WingBlank>
          <InputItem>用户名</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default login