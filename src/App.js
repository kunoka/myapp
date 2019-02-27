import React, {Component, Fragment} from 'react';
import {Button} from 'antd-mobile';
export default class App extends Component {

  render() {
    const boss = '赵云龙';
    return (
      <Fragment>
      <Button type="primary">Submit</Button>
      <div>园长{boss}</div>
      <一营 老大='张大喵'></一营>
      <一营2 老大='张大里'></一营2>
      </Fragment>
    )
  }
}

class 一营 extends Component {
  render() {
    return (
        <div>一营长{this.props.老大}</div>
    )
  }
}

function 一营2(props){
  return(
  <div>一营长{props.老大}</div>
  )

}