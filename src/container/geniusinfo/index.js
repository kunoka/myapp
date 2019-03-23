import React from 'react';
import {connect} from 'react-redux';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      title: '',
      desc: '',
      type: 'genius'
    }
    this.setAvatar = this.setAvatar.bind(this);
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  setAvatar(avatar) {
    console.log(avatar);
    this.setState({
      avatar
    })
  }

  render() {
    const redirect = this.props.redirectTo;
    const path = this.props.location.pathname;
    return (<div>
      {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : ''}
      <NavBar mode="dark">牛人完善信息页</NavBar>
      <AvatarSelector selectAvatar={this.setAvatar}/>
      <InputItem onChange={(v) => this.onChange('title', v)}>求职岗位</InputItem>
      <TextareaItem
        rows={3}
        onChange={(v) => this.onChange('desc', v)}
        title="个人简介"
      />
      <Button type='primary' onClick={() => this.props.update(this.state)}>保存</Button>
    </div>)
  }
}

export default (GeniusInfo)