import React, { Component } from 'react';
import { connect } from 'react-redux';

import keyboards from '../../config/keyboards';
import './InstrumentSettings.css';

class InstrumentSettings extends Component {
  constructor(props) {
    super();
    this.state = {
      keyInputValues: {}
    };
  }

  componentDidMount() {
    const keyInputValues = keyboards.mac.reduce((acc, keyboardRow) => {
      const keySources = keyboardRow.reduce((acc, [key]) => {
        const matchingSound = this.props.sounds.find(({ triggerKey}) => {
          return triggerKey === key;
        });
        const source = matchingSound ? matchingSound.source : '';

        const newAcc = { ...acc };
        newAcc[key] = { source };

        return newAcc;
      }, {});

      return { ...acc, ...keySources };
    }, {});
    
    this.setState({ keyInputValues });
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
      <div className="instrument-settings">
        <h1>{this.props.name} Settings</h1>
        <button type="submit">Save</button>
        <button>Close</button>
        <form className="instrument-settings__form">
          {Object.entries(this.state.keyInputValues).map(([key, { source }]) => {
             return (
              <div className="instrument-settings__input-row" key={key}>
                <label className="instrument-settings__label" htmlFor={key}>{key}</label>
                <input 
                  className="instrument-settings__input" 
                  name={key} 
                  type="text"
                  value={source}
                  onChange={this.handleInputChange.bind(this, key)}
                ></input>
              </div>
            );
          })};
        </form>
      </div>
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