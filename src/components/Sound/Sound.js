import { Component } from 'react';
import { connect } from 'react-redux'; 

import { AudioSource } from '../../services/audio';

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
       
      if ((this.props.playback !== undefined && this.props.playback !== prevProps.playback) || 
        this.props.isKeyDown !== prevProps.isKeyDown
      ) {
        if (this.props.playback === true || this.props.isKeyDown === true) {
          this.audioSource.play();
        } else if (this.props.playback === false || this.props.isKeyDown === false) {
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

  const playback = (
    recording[instrumentId] && 
    recording[instrumentId][playIndex] &&
    recording[instrumentId][playIndex][key]
  );
  const isKeyDown = playing[instrumentId] && playing[instrumentId][key];

  return { playback, isKeyDown };
}

export default connect(mapStateToProps)(Sound);

