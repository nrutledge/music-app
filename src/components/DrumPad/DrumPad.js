import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { handleKeyEvent, loadAudioBuffer } from '../../services';
import { keyPress } from '../../actions';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioBuffer: null,
            audioSource: null,
            gainNode: null,
            isPlaying: false,
            isPressed: false,
            lastStartTime: null
        }
    }

    componentDidMount() {
        this.setAudioBuffer(this.props.audioCtx, this.props.source);
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
            this.stopSound(this.props.audioCtx, this.state.gainNode, this.props.stopDelay, this.props.decayTime)
        }
        */

        
        if ((this.props.playback && this.props.playback !== prevProps.playback) || 
            this.props.isKeyDown !== prevProps.isKeyDown
        ) {
            if (this.props.playback === 'd' || this.props.isKeyDown) {
                this.setState({ isPressed: true });
                this.playSound(
                    this.props.audioCtx, 
                    this.props.panner, 
                    this.state.audioBuffer, 
                    this.state.lastStartTime,
                    this.props.volume, 
                    this.props.detune, 
                    this.props.instrumentVolume,
                    this.props.instrumentPanning,
                    this.props.instrumentDetune,
                    this.props.transitionTime
                );
            } else {
                this.setState({ isPressed: false });
                this.stopSound(
                    this.props.audioCtx, 
                    this.state.gainNode, 
                    this.props.stopDelay, 
                    this.props.decayTime
                );
            }
        } 
    }

    setAudioBuffer = async (audioCtx, src) => {
        const decodedData = await loadAudioBuffer(audioCtx, src);

        this.props.incrementLoadedCount();
        this.setState({ audioBuffer: decodedData });
    }
    
    playSound = (audioCtx, 
        panner, 
        bufferToPlay, 
        lastStartTime,
        volume = 1,
        detune = 0, 
        instrumentVolume = 1, 
        instrumentPanning = 0, 
        instrumentDetune = 0, 
        attackTime = 0.005, 
    ) => {
        const source = audioCtx.createBufferSource();
        const gainNode = this.props.audioCtx.createGain();
        source.buffer = bufferToPlay;

        // Max time (in seconds) that is considered to be fast playing
        // in case of repeated triggers of same drum pad
        const fastCutoff = 0.15;

        // Minimum volume to play during fast playing
        const minVolume = 0;

        // Change volume of sound based on trigger frequency to simulate
        // physics of shorter stick travel having less force
        if (lastStartTime) {
            let playedTime = audioCtx.currentTime - lastStartTime;
            if (playedTime > fastCutoff) { playedTime = fastCutoff; }
            volume *= minVolume + (playedTime * (1 - minVolume) / fastCutoff);
        }

        // Randomly vary volume to simulate variations in real playing
        const maxVariance = 0.1;
        volume -= Math.random() * maxVariance;

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume * instrumentVolume, audioCtx.currentTime + attackTime);

        panner.pan.setValueAtTime(instrumentPanning, audioCtx.currentTime);
        source.detune.setValueAtTime(instrumentDetune + detune, audioCtx.currentTime);

        // @Todo: Optimize the connects (move to different methods)
        source.connect(gainNode);
        gainNode.connect(panner);

        source.start(audioCtx.currentTime);

        source.onended = () => { 
            this.setState({ isPlaying: false }); 
        };

        this.setState({ 
            audioSource: source,
            gainNode: gainNode,
            isPlaying: true,
            lastStartTime: audioCtx.currentTime
        });
    }

    stopSound = (audioCtx, gainNode, stopDelay = 0, decayTime = 0.005) => {
        if (stopDelay === 0) {
            gainNode && gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + decayTime); 
        } else {
            setTimeout(() => {
                gainNode && gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + decayTime);
            }, stopDelay * 1000)
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

const mapStateToProps = ({ record: { playing, recording }, controls: { playIndex } }, ownProps) => { 
    const key = ownProps.triggerKey;
    const playback = recording[playIndex] ? recording[playIndex][key] : undefined;
    const isKeyDown = playing[key];
    
    return { playback, isKeyDown };

}
export default connect(mapStateToProps, { keyPress })(DrumPad);

