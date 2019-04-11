import React, { Component } from 'react';
import { connect } from 'react-redux';

import keyboards from '../../config/keyboards';
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

    const drumPads = keyboards.mac.map(row => {
      return (
        <div className="key-row">
          {row.map(([key, widthMultiplier, fontStyle]) => {
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
            />
          })}
        </div>
      );
    });

    return (
      <div className="key-pad">
        {drumPads}
      </div> 
    );
  }
}

export default connect(({ instruments: { byId } }) => ({ instruments: byId }))(PadBank);