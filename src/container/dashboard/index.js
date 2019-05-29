import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import NavLinkBar from '../../components/navlink';

import Boss from '../../components/boss';
import Genius from '../../components/genius';

function Msg() {
  return <h2>msg</h2>
}
function User() {
  return <h2>User</h2>
}
@connect(state => state)
class Dashboard extends React.Component {


  render() {
    const {pathname} = this.props.location;
    console.log('pathname');
    console.log(pathname);
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
    return(
      <div>
        <NavBar mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
        <div>
          <Switch>
            {navList.map((nav) => {
              return (
                <Route key={nav.path} path={nav.path} component={nav.component}></Route>
              )
            })}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default Dashboard