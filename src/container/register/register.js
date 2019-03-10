import React from 'react';
import {WingBlank, WhiteSpace, InputItem, Button, List, Radio} from 'antd-mobile';
import Logo from '../../components/logo/logo';

class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "牛人"
    }
  }

  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <Logo/>
        <List>
          <InputItem>用户名</InputItem>
          <WhiteSpace/>
          <InputItem>密码</InputItem>
          <WhiteSpace/>
          <InputItem>确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem checked={this.state.type === '牛人'}>牛人</RadioItem>
          <WhiteSpace/>
          <RadioItem checked={this.state.type === 'BOSS'}>BOSS</RadioItem>
          <WhiteSpace/>
          <RadioItem>Boss</RadioItem>
          <WhiteSpace />
          <Button type="primary">注册</Button>
        </List>
      </div>
    )
  }
}

export default register