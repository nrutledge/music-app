import React, { Component } from 'react';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioBuffer: null,
            audioSource: null,
            gainNode: null,
            panner: null,
            isPressed: false
        }
    }

    componentDidMount() {
        window.focus();
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);

        this.loadAudioBuffer(this.props.audioCtx, this.props.source);
        this.createPanner(this.props.audioCtx, this.props.pan);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);        
    }


    componentDidUpdate(prevProps) {
        // Stop playing sound if another key in same exclusive zone was played
        if (prevProps.lastPlayedKey === this.props.lastPlayedKey) { return; } 
        if (this.props.exclusiveZone &&
            this.props.exclusiveZone === this.props.lastPlayedZone &&
            this.props.lastPlayedKey !== this.props.triggerKey 
        ) {
            this.stopSound(this.props.audioCtx, this.state.audioSource, this.state.gainNode, 0.001)
        }
    }

    
    handleKeyDown = (e) => {
        let key = e.key;

        // Play lower intensity when shift key / caps lock is on
        let intensity = 1;
        if (typeof key === 'string' && key === key.toUpperCase()) {
            intensity = 0.7;
            key = key.toLowerCase();
        }

        // Only play if correct key pressed and that key isnt' already
        // pressed (i.e., prevent auto-repeat)
        if (key !== this.props.triggerKey || this.state.isPressed) { return; }

        this.stopSound(this.props.audioCtx, this.state.audioSource, this.state.gainNode, 0.001)
        this.playSound(
            this.props.audioCtx, 
            this.state.panner, 
            this.state.audioBuffer, 
            this.props.volume, 
            this.props.detune, 
            this.props.instrumentDetune,
            0.001, 
            0.001
        );
        this.props.setLastPlayed(this.props.exclusiveZone, key, this.props.name);

        this.setState({ isPressed: true });
    }

    handleKeyUp = (e) => {
        const key = (typeof e.key === 'string') ? e.key.toLowerCase() : e.key;
        if (key !== this.props.triggerKey) { return; }

        this.setState({ isPressed: false });
    }

    loadAudioBuffer = async (audioCtx, src) => {
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const decodedData = await audioCtx.decodeAudioData(arrayBuffer);

        this.props.incrementLoadedCount();
        this.setState({ audioBuffer: decodedData });
    }

    createPanner = (audioCtx, panValue = 0) => {
        const panner = audioCtx.createStereoPanner();
        panner.pan.setValueAtTime(panValue, audioCtx.currentTime);
        this.setState({ panner });
    }
/*
    setPanner = (audioCtx, panner, value) => {
        panner.pan.setValueAtTime(value, audioCtx.currentTime);
    }
*/
    
    playSound = (audioCtx, panner, bufferToPlay, volume = 1, detune = 0, instrumentDetune = 0, attackTime = 0.001, startDelay = 0) => {
        const source = audioCtx.createBufferSource();
        source.buffer = bufferToPlay;

/*
        // Max time (in seconds) that is considered to be fast playing
        // in case of repeated triggers of same drum pad
        const fastCutoff = 0.12;

        // Minimum volume to play during fast playing
        const minVolume = 0.6;

        // Change volume of sound based on trigger frequency to simulate
        // physics of shorter stick travel having less force
        if (currentTime > 0 && currentTime < fastCutoff) {
            volume *= minVolume + (currentTime * (1 - minVolume) / fastCutoff);
        }
*/

        // Create temp gain node used for ramping up volume (without affecting currently playing sound)
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + attackTime);

        // @Todo: Optimize the connects (move to different methods)
        source.connect(gainNode);
        gainNode.connect(panner);
        panner.connect(audioCtx.destination);

        source.detune.setValueAtTime(instrumentDetune + detune, audioCtx.currentTime);

        source.start(audioCtx.currentTime + startDelay);
        this.setState({ 
            audioSource: source,
            gainNode: gainNode
        });
    }

    stopSound = (audioCtx, audioSource, gainNode, fadeOutTime = 0) => {
        gainNode && gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeOutTime);
        audioSource && audioSource.stop(audioCtx.currentTime + fadeOutTime);
    }

    handleMouseDown = () => this.handleKeyDown({ key: this.props.triggerKey });
    handleMouseUp = () => this.handleKeyUp({ key: this.props.triggerKey });
    handleMouseEnter = () => this.props.setDisplay(this.props.name);
    handleMouseLeave = () => this.handleKeyUp({ key: this.props.triggerKey });
 
    render() {
        const lightness = this.state.isPressed ? '90%' : '75%';
        const shadowAlpha = this.state.isPressed ? '0.4' : '0.2';

        return (
            <button 
                className="drum-pad" 
                id={this.props.type} 
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{ 
                    border: `3px solid hsl(${this.props.hue}, 80%, ${lightness})`,
                    boxShadow: `0px 0px 20px 3px hsla(${this.props.hue}, 95%, 60%, ${shadowAlpha})`,
                    color: `hsl(${this.props.hue}, 80%, ${lightness})`

                }}
            >
                {this.props.triggerKey.toUpperCase()}
            </button>
        );
    }
}

export default DrumPad