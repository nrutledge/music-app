import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import clamp from '../../util/clamp';

const connectedProps = [
  {
    propName: 'name',
    propType: String
  },
  {
    propName: 'source',
    propType: String
  },
  {
    propName: 'volume',
    propType: Number
  },
  {
    propName: 'detune',
    propType: Number
  }
]

class KeySettingsForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.name,
      source: props.source,
      volume: props.volume.toString(),
      detune: props.detune.toString()
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Update state if props have changed and
    // update Redux store if internal state has changed
    connectedProps.forEach(({ propName, propType }) => {
      if (this.props[propName] !== prevProps[propName]) { 
        this.setState({ [propName]: this.props[propName].toString() }) 
      }

      if (this.state[propName] !== prevState[propName]) {
        let value = this.state[propName];
        if (propType === Number) {
          value = parseFloat(value);
        }

        if (propType === String || !isNaN(value)) {
          this.props.updateInstrumentSound(
            this.props.instrumentId, 
            this.props.keyName,
            { [propName]: value }
          );
        }

      }
    })
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSourceChange = e => {
    this.setState({ source: e.target.value });
  };

  handleVolumeChange = e => {
    let value = e.target.value;
    if (!isNaN(value)) {
      value = clamp(value, 0, 1);
    }

    this.setState({ volume: value.toString() });
  };

  handleDetuneChange = e => {
    let value = e.target.value;

    // Clamp numeric values only ("-" chars in input field will have value of '')
    if (value !== '' && !isNaN(value)) {
      value = clamp(parseFloat(value), -4800, 4800).toString();
    }
    
    this.setState({ detune: value });
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input 
            name="name" 
            type="text" 
            value={this.state.name}
            onChange={this.handleNameChange}
          ></input>
        </div>
        <div>
          <label htmlFor="source">Source</label>
          <input 
            name="source" 
            type="text" 
            value={this.state.source}
            onChange={this.handleSourceChange}
          ></input>
        </div>
        <div>
          <label htmlFor="volume">Volume</label>
          <input 
            name="volume" 
            type="number" 
            min="0"
            max="1"
            value={this.state.volume}
            onChange={this.handleVolumeChange}
          ></input>
        </div>
        <div>
          <label htmlFor="detune">Detune</label>
          <input 
            name="detune" 
            type="number" 
            min="-2400"
            max="2400"
            value={this.state.detune}
            onChange={this.handleDetuneChange}
          ></input>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { instrumentId, keyName } = ownProps;
  const { name, source, volume, detune } = state.instruments
    .byId[instrumentId]
    .sounds
    .find(sound => sound.triggerKey === keyName)

  return {
    name,
    source,
    volume,
    detune
  };
}

export default connect(mapStateToProps, actions)(KeySettingsForm);