import React, { Component } from 'react';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPressed: false
        }
    }

    componentDidMount() {
        window.focus();
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);        
    }

/*    
    componentDidUpdate(prevProps) {
        // Stop playing sound if another key in same exclusive zone was played
        if (this.props.exclusiveZone &&
            this.props.exclusiveZone === this.props.lastPlayedZone &&
            this.props.lastPlayedKey !== this.props.triggerKey 
        ) {
            this.stopSound(null, 50);
        }
    }
*/
    

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

        this.props.playSound(this.props.name);
        this.props.setLastPlayed(this.props.exclusiveZone, key, this.props.name);
        this.setState({ isPressed: true });
    }

    handleKeyUp = (e) => {
        const key = (typeof e.key === 'string') ? e.key.toLowerCase() : e.key;

        if (key === this.props.triggerKey) {
            this.setState({ isPressed: false });
        }
    }

    /*
    playSound = (intensity) => {
        const audio = this.audio.current;
        const currentTime = audio.currentTime;

        // Max time (in seconds) that is considered to be fast playing
        // in case of repeated triggers of same drum pad
        const fastCutoff = 0.12;

        // Minimum volume to play during fast playing
        const minVolume = 0.6

        let newVolume = intensity * this.props.volume;

        // Change volume of sound based on trigger frequency to simulate
        // physics of shorter stick travel having less force
        if (currentTime > 0 && currentTime < fastCutoff) {
            newVolume *= minVolume + (currentTime * (1 - minVolume) / fastCutoff);
        }

        // Set volume of audio element (without exceeding 1) and begin playback
        audio.volume = newVolume < 1 ? newVolume : 1; 
        audio.currentTime = 0;
        audio.play();
    }

    stopSound = (audioRef, delay = 0) => {
        setTimeout(() => {
            // Stop sound if it isn't the currently playing key (to prevent
            // callback running on a subsequent play)
            if (this.props.lastPlayedKey !== this.props.triggerKey) {
            //    audioRef.pause();
            //    audioRef.currentTime = 0;
            }
        }, delay);
    }
    */
    

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