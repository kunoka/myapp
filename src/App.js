import React, {Component, Fragment} from 'react';
import {Button} from 'antd-mobile';
import {addGun, removeGun, addGunAsync} from './store/actionCreators';
import {connect} from 'react-redux';
import store from './store';
import {logout} from './Auth.redux';

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    auth: state.auth
  }
}
// 你要什么方法，放到props里，自动dispatch
const mapDispatchToProps = {addGun, removeGun, addGunAsync, logout};
@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);
    // this.addGun = this.addGun.bind(this);
    // this.removeGun = this.removeGun.bind(this);
  }


  render() {
    console.log('this.props');
    console.log(this.props);
    return (
      <div>
        <h2>独立团长{this.props.auth.user}</h2>
        {this.props.auth.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
        <p>
          <Button type="primary" onClick={this.props.addGun}>增加枪</Button>
        </p>
        <p>
          <Button type="primary" onClick={this.props.removeGun}>减少枪</Button>
        </p>
        <p>
          <Button type="primary" onClick={this.props.addGunAsync}>过两天再增加枪</Button>
        </p>
        <h1 style={{textAlign: 'center'}}>当前枪支数量{this.props.counter.counter}</h1>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addGun: () => {
//       dispatch(addGun());
//     },
//     removeGun: () => {
//       dispatch(removeGun());
//     },
//     addGunAsync: () => {
//       dispatch(addGunAsync());
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App