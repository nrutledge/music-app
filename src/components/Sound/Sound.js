import { Component } from 'react';
import { connect } from 'react-redux'; 

import { AudioSource } from '../../services/audio';

const audioSourcePropNames = [
  'source',
  'volume',
  'detune',
  'instrumentVolume',
  'instrumentDetune',
  'stopDelay',
  'decayTime'
];

class Sound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioBuffer: null,
      gainNode: null,
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
    }

    componentDidUpdate(prevProps) {
      // @TODO: Fix exclusive group logic
      // Stop playing sound if another key in same exclusive group was played
      /*
      if (this.props.exclusiveGroup &&
          prevProps.lastPlayedKey !== this.props.lastPlayedKey &&
          this.props.exclusiveGroup === this.props.lastPlayedZone &&
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
       
      if (
        (
          this.props.playbackState !== undefined && 
          this.props.playbackState !== prevProps.playbackState
        ) || 
        this.props.keydownState !== prevProps.keydownState
      ) {
        if (this.props.playbackState === true || this.props.keydownState === true) {
          this.audioSource.play();
        } else {
          this.audioSource.stop();
        }
      }
    }

    render() { return null; }
}

const mapStateToProps = (
  { record: { playing, recording }, controls: { playIndex } }, 
  ownProps
) => { 
  const { triggerKey: key, instrumentId } = ownProps;

  // down, up or no change (true, false or undefined)
  const playbackState = (
    recording[instrumentId] && 
    recording[instrumentId][playIndex] &&
    recording[instrumentId][playIndex][key]
  );

  // down, up or unplayed (true, false or undefined
  const keydownState = playing[instrumentId] && playing[instrumentId][key];

  return { playbackState, keydownState };
}

export default connect(mapStateToProps)(Sound);

