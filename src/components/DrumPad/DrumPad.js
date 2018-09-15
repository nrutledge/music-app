import React, { Component } from 'react';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPressed: false
        }
        this.audio = React.createRef();
    }

    componentDidMount() {
        window.focus();
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.audio.current.volume = this.props.volume;
      }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);        
    }

    componentDidUpdate(prevProps) {
        this.stopOpenHiHat(prevProps.hiHatPosition);
    }
    
    handleKeyDown = (e) => {
        if (e.key === this.props.triggerKey) {
            // Prevent key auto-repeat
            if (this.state.isPressed) { return };
            this.setState({ isPressed: true });

            this.playSound();
        }
    }

    handleKeyUp = (e) => {
        if (e.key === this.props.triggerKey) {
            this.setState({ isPressed: false });
        }
    }

    stopOpenHiHat = (prevPosition) => {
        if (
            this.props.name === 'Hi-Hat Open' && 
            this.props.hiHatPosition === 'Hi-Hat Closed' &&
            this.props.hiHatPosition !== prevPosition
        ) { 
            this.stopSound(this.audio.current, 40);
        }
    }

    playSound = () => {
        const audio = this.audio.current;

        // Max time (in seconds) that is considered to be fast playing
        // in case of repeated triggers of same drum pad
        const fastCutoff = 0.12;

        // Minimum volume to play during fast playing
        const minVolume = 0.6

        // Change volume of sound based on trigger frequency to simulate
        // physics of shorter stick travel having less force
        const currentTime = audio.currentTime;
        if (currentTime > 0 && currentTime < fastCutoff) {
            // Vary volume between 0.5 and 1 based on frequency
            audio.volume = this.props.volume * (minVolume + (currentTime * (1 - minVolume) / fastCutoff));
        } else {
            audio.volume = this.props.volume;
        }

        audio.currentTime = 0;
        audio.play();

        if (this.props.isHiHat) {
            this.props.setHiHatPosition(this.props.name);
        }

        this.props.setDisplay(this.props.name);
    }

    stopSound = (audioRef, delay = 0) => {
        setTimeout(() => {
            audioRef.pause();
            audioRef.currentTime = 0;
        }, delay);
    }
 
    render() {
        const lightness = this.state.isPressed ? '90%' : '75%';
        const shadowAlpha = this.state.isPressed ? '0.4' : '0.2';

        return (
            <button 
                className="drum-pad" 
                id={this.props.type} 
                onMouseDown={() => this.handleKeyDown({ key: this.props.triggerKey })}
                onMouseUp={() => this.handleKeyUp({ key: this.props.triggerKey })}
                onMouseLeave={() => this.handleKeyUp({ key: this.props.triggerKey })}
                style={{ 
                    border: `3px solid hsl(${this.props.hue}, 80%, ${lightness})`,
                    boxShadow: `0px 0px 20px 3px hsla(${this.props.hue}, 95%, 60%, ${shadowAlpha})`,
                    color: `hsl(${this.props.hue}, 80%, ${lightness})`

                }}
            >
                {this.props.triggerKey.toUpperCase()}
                <audio 
                    ref={this.audio} 
                    id={this.props.triggerKey.toUpperCase()}
                    className="clip"
                    src={this.props.sound} 
                    onCanPlayThrough={() => this.props.incrementLoadedCount()}
                    preload="auto" 
                >
                </audio>
            </button>
        );
    }
}

export default DrumPad