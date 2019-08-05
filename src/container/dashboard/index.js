import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import NavLinkBar from '../../components/navlink';

import Boss from '../../components/boss';
import Genius from '../../components/genius';
import User from '../../components/user';
import {getMsgList, recvMsg} from '../../redux/chat.redux';

function Msg() {
  return <h2>msg</h2>
}

@connect(
  state => state,
  {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
  }

  render() {
    const {pathname} = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },

      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ];
    return (
      <div>
        {!this.props.user.isAuth && <Redirect to="/login"/>}
        <NavBar mode='dard'>
          {this.props.user.isAuth && navList.find(v => v.path === pathname).title}</NavBar>
        <div>
          <Switch>
            {navList.map((nav) => {
              return (
                <Route key={nav.path} path={nav.path} component={nav.component}></Route>
              )
            })}
          </Switch>
        </div>
        <NavLinkBar data={navList}/>
      </div>
    )
  }
}

export default Dashboard