import React, { Component } from 'react';
import { connect } from 'react-redux';

import { keyResetCompleted } from '../../actions';

import DrumPad from '../DrumPad/DrumPad';
import './PadBank.css';

const baseKeySize = 3.5;

class PadBank extends Component {
  render() {
    // Get color for each armed instrument's keys
    const activeKeys = Object.values(this.props.instruments).reduce((acc, instrument) => {
      if (!instrument.armed) { return acc; }

      const keySounds = instrument.sounds.reduce((acc, sound) => {
        acc[sound.triggerKey] = { instrumentId: instrument.id, hue: instrument.hue };
        return acc;
      }, {});
      return { ...acc, ...keySounds };
    }, {});

    const drumPads = this.props.keyboard.map((row, i) => {
      return (
        <div className="key-row" key={i}>
          {row.map(([key, widthMultiplier, fontStyle], j) => {
            const width = widthMultiplier ? baseKeySize * widthMultiplier : baseKeySize;
            let fontSize;
            if (fontStyle === 's') {
              fontSize = 0.8;
            } else {
              fontSize = 1.3;
            }

            return <DrumPad 
              isActive={activeKeys[key] !== undefined ? true : false} 
              triggerKey={key} 
              instrumentId={activeKeys[key] && activeKeys[key].instrumentId}
              hue={(activeKeys[key] && activeKeys[key].hue) || 0} 
              width={width} 
              height={baseKeySize}
              fontSize={fontSize}
              reset={this.props.reset}
              key={j}
            />
          })}
        </div>
      );
    });

    // If keys were reset to a key-up state, send confirmation back
    // to keyboards reducer (otherwise keys will be stuck in key-up state) 
    this.props.reset && this.props.keyResetCompleted();

    return (
      <div className="key-pad">
        {drumPads}
      </div> 
    );
  }
}

const mapStateToProps = ({ instruments, keyboards }) => {
  return { 
    instruments: instruments.byId, 
    keyboard: keyboards.keyboard,
    reset: keyboards.reset
  }
}

export default connect(mapStateToProps, { keyResetCompleted })(PadBank);