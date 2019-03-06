import React, {Component, Fragment} from 'react';
import {Button} from 'antd-mobile';
import {addGun, removeGun, addGunAsync} from './store/actionCreators';
import {connect} from 'react-redux';
import store from './store';

// 你要什么方法，放到props里，自动dispatch
const mapDispatchToProps = {addGun, removeGun, addGunAsync}
@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
    // this.addGun = this.addGun.bind(this);
    // this.removeGun = this.removeGun.bind(this);
  }


  render() {
    return (
      <div>
        <p>
          <Button type="primary" onClick={this.props.addGun}>增加枪</Button>
        </p>
        <p>
          <Button type="primary" onClick={this.props.removeGun}>减少枪</Button>
        </p>
        <p>
          <Button type="primary" onClick={this.props.addGunAsync}>过两天再增加枪</Button>
        </p>
        <h1 style={{textAlign: 'center'}}>当前枪支数量{this.props.count}</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App