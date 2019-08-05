import React, {Component} from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {withRouter} from "react-router-dom";

@withRouter
class UserCard extends Component {
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const data = this.props.userList;
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <WingBlank>
        <WhiteSpace/>
        <div>
          {data && data.map((item, index) => {
            return (
              item.avatar ? <Card
                key={index}
                onClick={() => this.handleClick(item)}
              >
                <Header
                  title={item.user}
                  thumb={require(`../img/${item.avatar}.png`)}
                  extra={<span>{item.title}</span>}
                >
                </Header>
                <Body>
                  {item.type === 'boss' ? <div>公司：{item.company}</div> : null}
                  {item.desc.split('\n').map((v => (
                    <div key={v}>{v}</div>
                  )))}
                  {item.type === 'boss' ? <div>薪资：{item.money}</div> : null}
                </Body>
              </Card> : null
            )
          })}
        </div>
      </WingBlank>
    )
  }
}

export default UserCard;