import React, {Component} from 'react';
import {List, InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList} from '../../redux/chat.redux';

@connect(
  state => state,
  {getMsgList}
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
    // socket.on('recvmsg', (data) => {
    //   console.log(data);
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }

  handleChange(v) {
    this.setState({
      text: v
    })
  }

  handleSend() {
    // const {text} = this.state;
    // socket.emit('sendmsg', {text});
    // console.log('text', {text})
    // this.setState({
    //   text: ''
    // })
  }

  render() {
    const {text, msg} = this.state;
    return (
      <div>
        {msg.map((v, index) => {
          return (<p key={index}>{v}</p>)
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