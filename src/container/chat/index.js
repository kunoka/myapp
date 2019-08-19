import React, {Component} from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux';
import {getChatId} from '../../utils';
import {emojiList} from '../../constants/emojs';

const Item = List.Item;

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }

  componentDidMount() {
    if (!this.props.chat.users) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
    this.fixCarousel();
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  // 修正跑马灯
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
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
    const {text} = this.state;
    const userid = this.props.match.params.user;
    let {users, chatmsg} = this.props.chat;
    if (!users) return null;
    const chatId = getChatId(this.props.user._id, userid);
    chatmsg = chatmsg.filter(v => {
      return v.chatid === chatId;
    });
    const emoji = emojiList.split(' ').filter(v => v).map(v =>
      ({text: v})
    )
    return (
      <div id='chat-page'>
        <NavBar
          mode="dark"
          icon={<Icon type="left"/>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}>
          {users[userid].name}
        </NavBar>

        {chatmsg.map((v, index) => {
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
                extra={<img src={avatar} alt=""/>}
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
              extra={
                <div>
                  <span style={{marginRight: 15}}
                        onClick={() => {
                          this.setState({
                            showEmoji: !this.state.showEmoji
                          });
                          this.fixCarousel();
                        }}
                  >😀</span>
                  <span onClick={(v) => this.handleSend(v)}>发送</span>
                </div>

              }>

            </InputItem>
            {/*chat with user: {this.props.match.params.user}*/}
          </List>
          {this.state.showEmoji ?
            <Grid
              data={emoji}
              columnNum={9}
              isCarousel={true}
              carouselMaxRow={4}
              onClick={(el) => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            /> : null
          }
        </div>
      </div>
    )
  }
}

export default Chat