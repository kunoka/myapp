import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class AuthRouter extends React.Component {
  componentDidMount() {
    const userList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    if (userList.indexOf(pathname) > -1) {
      return null;
    }
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        if (res.data.code === 0) {
          // 没有登录信息
        } else {
          this.props.history.push('/login');
        }
      }
    })
  }

  render() {
    return (
      <div>
        user auth
      </div>
    )
  }
}

export default withRouter(AuthRouter);