import React from 'react';
import {WhiteSpace, InputItem, Button, List, Radio} from 'antd-mobile';
import Logo from '../../components/logo/logo';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import imoocForm from '../../components/imooc-form';
import './style.css';

@connect(
  state => state.user,
  {register}
)
@imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

componentDidMount() {
    this.props.handleChange('type', 'genius')
}

  handleRegister() {
    this.props.register(this.props.state);
    console.log(this.props.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <List>
          <div className="error-msg">{this.props.msg}</div>
          <InputItem onChange={(v) => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace/>
          <InputItem type="password" onChange={(v) => this.props.handleChange('rptpwd', v)}>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            key="genius"
            checked={this.props.state.type === 'genius'}
            onChange={(v) => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem
            key="boss"
            checked={this.props.state.type === 'boss'}
            onChange={(v) => this.props.handleChange('type', 'boss')}>BOSS</RadioItem>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register