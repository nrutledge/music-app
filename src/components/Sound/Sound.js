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

    render() { return null; }
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

export default connect(mapStateToProps)(Sound);

