import React from 'react';
import logoImg from './job.png';

class logo extends React.Component {
  render() {
    return  (
      <div className="logo-container">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

export default logo