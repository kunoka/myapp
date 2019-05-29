import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace} from 'antd-mobile';

@connect(
  state => state.user
)
class User extends Component {
  render() {

    const Item = List.Item;
    const Brief = Item.Brief;
    const props = this.props;
    console.log(props);
    return props.user ?
      (<div>
          <Result
            title={props.user}
            img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt=""/>}
            message={props.type === 'boss' ? props.company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {props.title}
              {props.desc.split('\n').map((v, index) => <Brief key={index}>{v}</Brief>)}
              {props.money}
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <List>
            <Item>
              退出登录
            </Item>
          </List>
        </div>
      ) : null;
  }
}

export default User;