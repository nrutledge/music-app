import React, { Component } from 'react';

class ControlledInput extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.initialValue
    }
  }

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input 
          name={this.props.name} 
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
        ></input>
      </div>
    );
  }
}

export default ControlledInput;