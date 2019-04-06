import React, { Component } from 'react';
import { connect } from 'react-redux';

import keyboards from '../../config/keyboards';
import DrumPad from '../DrumPad/DrumPad';
import './PadBank.css';

const baseKeySize = 3.5;

class PadBank extends Component {
  render() {
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


            const instrumentMatches = this.props.instruments.reduce((acc, instrument) => {
              let hasMatchingKey = false;

              instrument.sounds.forEach(sound => {
                if (sound.triggerKey === key) {
                  hasMatchingKey = true;
                }
              });

              if (hasMatchingKey) {
                return [...acc, instrument]; 
              } else {
                return acc;
              }
            
            }, []);

            const isActive = instrumentMatches.length > 0 ? true : false;

            let hue = null;
            if (isActive) {
              hue = instrumentMatches.reduce((acc, instrument) => {
                if (acc === null) {
                  return instrument.hue;
                } else {
                  return (instrument.hue + acc);
                }
              }, null);
            }

            // Use instrument hue or avg. of hues in case of multiple instruments
            if (hue === null) { 
              hue = 0;
            } else {
              hue = hue / instrumentMatches.length;
            }

            return <DrumPad 
              isActive={isActive} 
              key={key} 
              triggerKey={key} 
              hue={hue} 
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

export default connect(({ instruments }) => ({ instruments }))(PadBank);