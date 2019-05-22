import React, {Component} from 'react';
import axios from 'axios';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.redux';
import {connect} from 'react-redux';
@connect(
  state => state.chatuser,
  {getUserList}
)

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.props.getUserList('genius');
  }

  render() {
    const data= this.props.userList;
    console.log('render-data', data);
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace />
        <div>
          {data && data.map((item, index) => {
            return (
              item.avatar ? <Card key={index}>
                <Header
                  title={item.user}
                  thumb={require(`../img/${item.avatar}.png`)}
                  extra={<span>{item.title}</span>}
                >
                </Header>
                <Body>
                {item.desc.split('\n').map((v=>(
                  <div key={v}>{v}</div>
                )))}
                </Body>
              </Card> : null
            )
          })}
        </div>
      </WingBlank>
    )
  }
}

export default Boss