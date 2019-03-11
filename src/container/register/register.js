import React from 'react';
import {WingBlank, WhiteSpace, InputItem, Button, List, Radio} from 'antd-mobile';
import Logo from '../../components/logo/logo';

class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      rptpwd: '',
      type: "niuren"
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, v) {
    this.setState({
      [key]: v
    });
  }
  handleRegister() {
    console.log(this.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo/>
        <List>
          <InputItem onChange={(v) => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.handleChange('rptpwd', v)}>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            key="niuren"
            checked={this.state.type === 'niuren'}
            onChange={(v) => this.handleChange('type', 'niuren')}>牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem
            key="boss"
            checked={this.state.type === 'boss'}
            onChange={(v) => this.handleChange('type', 'boss')}>BOSS</RadioItem>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default register