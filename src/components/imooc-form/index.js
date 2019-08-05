import React, {Component} from 'react';

export default function imoocForm (Comp) {
  class WrapperComp extends Component {
    constructor(props) {
      super(props);
      this.state ={}
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, v) {
      // console.log(key, v);
      this.setState({
        [key]: v
      });
    }

    render() {
      return (
        <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
      )
    }
  }
  return WrapperComp;
}