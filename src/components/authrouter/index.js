import React from 'react';
import axios from 'axios';

class AuthRouter extends React.Component {
  componentDidMount() {
    axios.get('/user/info').then((res) => {
      if(res.status === 200) {
        console.log(res.data);
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

export default AuthRouter