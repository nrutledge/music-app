import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import { AudioSource } from '../../services/audio';
import { handleKeyEvent } from '../../services';
import { keyPress } from '../../actions';
import './DrumPad.css';

const audioSourcePropNames = [
  'source',
  'volume',
  'detune',
  'instrumentVolume',
  'instrumentPanning',
  'instrumentDetune',
  'stopDelay',
  'decayTime'
];

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioBuffer: null,
      gainNode: null,
      isPlaying: false,
      isPressed: false,
      lastStartTime: null
    }
    this.audioSource = new AudioSource();
  }

    componentDidMount() {
      this.audioSource.connect(this.props.instrumentInput);
      this.audioSource.onLoaded(this.props.incrementLoadedCount);
      
      audioSourcePropNames.forEach(propName => {
        this.audioSource[propName] = this.props[propName];
      });

      // @TODO: Fix or remove transitionTime 
      // audioSource.transitionTime = this.props.transitionTime;
    }

    componentDidUpdate(prevProps) {
      // @TODO: Fix exclusive zone logic
      // Stop playing sound if another key in same exclusive zone was played
      /*
      if (this.props.exclusiveZone &&
          prevProps.lastPlayedKey !== this.props.lastPlayedKey &&
          this.props.exclusiveZone === this.props.lastPlayedZone &&
          this.props.lastPlayedKey !== this.props.triggerKey 
      ) {
          // Fade sound out over longer duration than if single note were repeated (10x longer)
          this.stopSound(audioCtx, this.state.gainNode, this.props.stopDelay, this.props.decayTime)
      }
      */
       
      audioSourcePropNames.forEach(propName => {
        if (this.props[propName] !== prevProps[propName]) { 
          this.audioSource[propName] = this.props[propName]; 
        }
      })
       
      if ((this.props.playback && this.props.playback !== prevProps.playback) || 
        this.props.isKeyDown !== prevProps.isKeyDown
      ) {
        if (this.props.playback === 'd' || this.props.isKeyDown) {
          this.setState({ isPressed: true });
          this.audioSource.play();
        } else {
          this.setState({ isPressed: false });
          this.audioSource.stop();
        }
      } 
    }

    handleMouseEnter = () => this.props.setDisplayContent(this.props.name);
    handleMouseDown = handleKeyEvent(this.props.keyPress, false, this.props.triggerKey);
    handleMouseUp = handleKeyEvent(this.props.keyPress, true, this.props.triggerKey);

    // If currently playing, stop when mouse leaves key
    handleMouseLeave = () => this.props.play && 
      handleKeyEvent(this.props.keyPress, true, this.props.triggerKey)();

    render() {
        //const bgColor = this.state.isPressed ? `hsl(${this.props.hue}, 40%, 50%)` : 'rgb(60, 60, 60)';
        const bgColor = this.state.isPressed ? 'rgb(65, 65, 65)' : 'rgb(55, 55, 55)';
        const lightness = this.state.isPressed ? '88%' : '70%';
        const shadowAlpha = this.state.isPressed ? '0.6' : '0.2';

        return (
            <button 
                className="drum-pad" 
                id={this.props.type} 
                onMouseEnter={this.handleMouseEnter}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseLeave}
                style={{ 
                    backgroundColor: bgColor,
                    border: `3px solid hsl(${this.props.hue}, 70%, ${lightness})`,
                    boxShadow: `0px 0px 20px 3px hsla(${this.props.hue}, 95%, 60%, ${shadowAlpha})`,
                    color: `hsl(${this.props.hue}, 80%, ${lightness})`
                }}
            >
                {this.props.triggerKey.toUpperCase()}
            </button>
        );
    }
}

const mapStateToProps = (
  { record: { playing, recording }, controls: { playIndex } }, 
  ownProps
) => { 
    const key = ownProps.triggerKey;
    const playback = recording[playIndex] ? recording[playIndex][key] : undefined;
    const isKeyDown = playing[key];
    
    return { playback, isKeyDown };
}

export default connect(mapStateToProps, { keyPress })(DrumPad);

