import React from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const listStr = ('boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra');
    const listArr = listStr.split(',');
    const avatarList = listArr.map((v) => {
      return {
        icon: require(`../img/${v}.png`),
        text: v
      }
    });
    const gridHeader = this.state.icon ? (<div>
      <span>已选择的头像</span>
      <img style={{width: 20}} src={this.state.icon} alt=""/>
    </div>) : <div>请选择头像</div>;
    return (
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}
        >
        </Grid>
      </List>
    )
  }
}

AvatarSelector.propTypes = {
  selectAvatar: PropTypes.func.isRequired
}