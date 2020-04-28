import React, { Component } from "react";
import Switch from "react-switch"
 
class SwitchSource extends Component {
  constructor() {
    super();
    
  }


  render() {
    return (
          <Switch
            onChange={this.props.changeSource}
            checked={this.props.isguardian}
            onColor="#2693e6"
            uncheckedIcon={false}
            checkedIcon={false}
            
          />
      
    );
  }
}
export default SwitchSource