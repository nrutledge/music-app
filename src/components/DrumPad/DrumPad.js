import React, { Component } from 'react';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: this.props.hardSound
        }
        this.audioHard = React.createRef();
        this.audioSoft = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.audioHard.current.volume = this.props.hardVolume;
        this.audioSoft.current.volume = this.props.softVolume;
      }

    componentDidUpdate() {
        if (this.props.type === 'Hi-Hat Open' && this.props.currentHiHatPosition === 'Hi-Hat Closed') { 
            this.stopSound(this.audioHard.current, 40);
            this.stopSound(this.audioSoft.current, 40);
        }
    }
    
    isKeyDown = false;

    handleKeyDown = (e) => {
        if (e.key === this.props.triggerKey) {
            // Prevent key auto-repeat
            if (this.isKeyDown) { return };
            this.isKeyDown = true;

            this.playSound();

            const type = this.props.type;
            if (type.indexOf('Hi-Hat') >= 0) {
                this.props.setHiHatPosition(type);
            }
        }
    }

    handleKeyUp = (e) => {
        if (e.key === this.props.triggerKey) {
            this.isKeyDown = false;
        }
    }

    playSound = () => {
        const audioHard = this.audioHard.current;
        const audioSoft = this.audioSoft.current;
        
        if (
            (audioHard.currentTime > 0 && audioHard.currentTime < 0.08)
            || (audioSoft.currentTime > 0 && audioSoft.currentTime < 0.08)
        ) {
            console.log('audioSoft: ', audioSoft)
            this.stopSound(audioHard, 80);
            audioSoft.currentTime = 0;
            audioSoft.play();
        } else {
            this.stopSound(audioSoft, 80);
            audioHard.currentTime = 0;
            audioHard.play();
        }
    }

    stopSound = (audioRef, delay = 0) => {
        setTimeout(() => {
            audioRef.pause();
            audioRef.currentTime = 0;
        }, delay);
    }
 
    render() {
        return (
            <button className="drum-pad" id={this.props.type} onClick={this.playSound}>
                {this.props.triggerKey.toUpperCase()}
                <audio 
                    ref={this.audioHard} 
                    id={this.props.triggerKey.toUpperCase()}
                    className="clip"
                    src={this.props.hardSound} 
                    preload="auto" 
                >
                </audio>
                <audio
                    ref={this.audioSoft} 
                    id={this.props.triggerKey.toUpperCase() + '-soft'}
                    src={this.props.softSound}
                    preload="auto" 
                >
                </audio>
            </button>
        );
    }
}

export default DrumPad