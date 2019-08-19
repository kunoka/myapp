import React, {Component} from 'react';
import {connect} from "react-redux";
import {List, Badge} from 'antd-mobile';
import {getMsgList, recvMsg} from '../../redux/chat.redux';

const Item = List.Item;
const Brief = Item.Brief;

@connect(
  state => state,
  {getMsgList, recvMsg}
)

class Msg extends Component {
  // const chatMsg = this.props.
  componentDidMount() {
    if (!this.props.chat.users) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  getLast(arr) {
    return arr[arr.length - 1];
  }

  render() {
    const {chatmsg} = this.props.chat;
    if (!chatmsg.length) return null;
    let msgGroup = {};

    // 按用户分组
    chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });

    // 按时间排序 倒序（最新的在最上面）
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    });

    const userid = this.props.user._id;
    return (<div>
      {chatList.map(v => {
        const lastItem = this.getLast(v);
        const targetId = v[0].from === userid ? v[0].to : v[0].from;
        const unreadNum = v.filter((v) => !v.read && v.to === userid).length;
        const userInfo = this.props.chat.users[targetId];
        if (!userInfo) return null;
        return (
          <List key={lastItem._id}>
            <Item
              extra={<Badge text={unreadNum}/>}
              thumb={require(`../img/${userInfo.avatar}.png`)}
              arrow='horizontal'
              onClick={() => {
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
              {lastItem.content}
              <Brief>{userInfo.name}</Brief>
            </Item>
          </List>
        )
      })}
    </div>)
  }
}

export default Msg;