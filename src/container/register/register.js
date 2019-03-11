import React from 'react';
import {WingBlank, WhiteSpace, InputItem, Button, List, Radio} from 'antd-mobile';
import Logo from '../../components/logo/logo';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import './style.css';

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      rptpwd: '',
      type: "genius"
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(key, v) {
    this.setState({
      [key]: v
    });
  }
  handleRegister() {
    this.props.register(this.state);
    console.log(this.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo/>
        <List>
          <div className="error-msg">{this.props.msg}</div>
          <InputItem onChange={(v) => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.handleChange('rptpwd', v)}>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            key="genius"
            checked={this.state.type === 'genius'}
            onChange={(v) => this.handleChange('type', 'genius')}>牛人</RadioItem>
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

export default Register