import React, {Component} from 'react';
import {List, InputItem, NavBar,Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg} from '../../redux/chat.redux';

const Item = List.Item;

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    if (!this.props.chat.users) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('this.props.chat', this.props.chat);
  }

  handleChange(v) {
    this.setState({
      text: v
    })
  }

  handleSend() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({
      text: ''
    })
  }

  render() {
    const {text, msg} = this.state;
    const userid = this.props.match.params.user;
    const {users} = this.props.chat;
    if (!users) return null;
    return (
      <div id='chat-page'>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={()=>{
          this.props.history.goBack()
          }}>
          {users[userid].name}
        </NavBar>

        {this.props.chat.chatmsg.map((v, index) => {
          const avatar = require(`../../components/img/${users[v.from].avatar}.png`);
          return v.from === userid ?
            (<List key={v._id}>
              <Item
                thumb={avatar}
              >{v.content}</Item>
            </List>)
            :
            (<List key={v._id}>
              <Item
                extra={<img src={avatar} alt="" />}
                className='chat-me'
                >{v.content}</Item>
            </List>)
        })}

        <div className="stick-footer">
          <List>
            <InputItem
              value={text}
              placeholder="请输入信息"
              onChange={(v) => this.handleChange(v)}
              extra={<span onClick={(v) => this.handleSend(v)}>发送</span>}>

            </InputItem>
            {/*chat with user: {this.props.match.params.user}*/}
          </List>
        </div>
      </div>


    )
  }
}

export default Chat