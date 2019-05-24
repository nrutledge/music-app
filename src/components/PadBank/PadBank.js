import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import DrumPad from '../DrumPad/DrumPad';
import './PadBank.css';

const baseKeySize = 3.5;

class PadBank extends Component {
  render() {
    // Get instrument IDs and color for each key based on armed instruments
    const keyDetails = Object.values(this.props.instruments).reduce((acc, instrument) => {
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
              isActive={this.props.activeKeys[key] && this.props.activeKeys[key].length > 0} 
              triggerKey={key} 
              instrumentId={keyDetails[key] && keyDetails[key].instrumentId}
              hue={(keyDetails[key] && keyDetails[key].hue) || 0} 
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
        <div className="key-pad__bottom-section">
          {
            this.props.isEditMode && 
            <button 
              className="key-pad__button--close"
              onClick={() => {
                this.props.closeEditMode();
                this.props.closeModal();
              }}
            >Close Edit Mode</button>
          }
        </div>
      </div> 
    );
  }
}

const mapStateToProps = ({ instruments, keyboards }) => {
  return { 
    isEditMode: instruments.isEditMode,
    instruments: instruments.byId, 
    activeKeys: instruments.activeKeys,
    keyboard: keyboards.keyboard,
    reset: keyboards.reset
  }
}

export default connect(mapStateToProps, actions)(PadBank);