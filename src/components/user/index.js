import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
@connect(
  state => state.user, {logoutSubmit}
)

class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert;
    const alertInstance = alert('注销', '是否退出登陆???', [
      {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
      {
        text: '确认', onPress: () => {
          browserCookie.erase('userid');
          this.props.logoutSubmit();
        }
      },
    ]);

  }

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
              {props.money ? <Brief>薪资：{props.money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <List>
            <Item onClick={this.logout}>
              退出登录
            </Item>
          </List>
        </div>
      ) : <Redirect to={props.redirectTo} />;
  }
}

export default User;