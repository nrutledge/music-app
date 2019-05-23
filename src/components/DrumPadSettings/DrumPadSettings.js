import React, { Component } from 'react';
import { connect } from 'react-redux';

import keyboards from '../../config/keyboards';

class InstrumentSettings extends Component {
  constructor(props) {
    super();
    this.state = {
      keyInputValues: {}
    };
  }

  handleInputChange = (key, e) => {
    const inputValue = e.target.value;
    e.preventDefault();
    this.setState(prevState => {
      const nextKeyInputValues = { ...prevState.keyInputValues };
      nextKeyInputValues[key] = { source: inputValue };

      return { keyInputValues: nextKeyInputValues };
    })
  }

  render() {
    return (
      <form className="instrument-settings__form">
        <div>
          <label htmlFor="source">Source</label>
          <input 
            className="instrument-settings__input" 
            name="source"
            type="text"
            value=""
            onChange={this.handleInputChange}
          ></input>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ instruments: { byId } }, { instrumentId }) => {
  const instrument = byId[instrumentId];
  return { 
    name: instrument.name,
    sounds: instrument.sounds 
  };
};

export default connect(mapStateToProps)(InstrumentSettings);