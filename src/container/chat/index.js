import React, {Component} from 'react';
import {List, InputItem, NavBar} from 'antd-mobile';
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
    this.props.getMsgList();
    this.props.recvMsg();
    // socket.on('recvmsg', (data) => {
    //   console.log(data);
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('this.props.chat', this.props.chat);
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
    // const {text} = this.state;
    // socket.emit('sendmsg', {text});
    // console.log('text', {text})
    this.setState({
      text: ''
    })
  }

  render() {
    const {text, msg} = this.state;
    const {user} = this.props.match.params;
    return (
      <div id='chat-page'>
        <NavBar mode="dark">
          {user}
        </NavBar>

        {this.props.chat.chatmsg.map((v, index) => {
          console.log(v.from, user);
          return v.from === user ?
            (<List key={v._id}>
              <Item
              >{v.content}</Item>
            </List>)
            :
            (<List key={v._id}>
              <Item
                extra={'avatar'}
                className='chat-me'>{v.content}</Item>
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