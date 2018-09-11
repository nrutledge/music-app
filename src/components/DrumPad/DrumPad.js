import React, { Component } from 'react';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPressed: false
        }
        this.audioHard = React.createRef();
        this.audioSoft = React.createRef();
    }

    componentDidMount() {
        window.focus();
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        this.audioHard.current.volume = this.props.hardVolume;
        this.audioSoft.current.volume = this.props.softVolume;
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
            this.props.type === 'Hi-Hat Open' && 
            this.props.hiHatPosition === 'Hi-Hat Closed' &&
            this.props.hiHatPosition !== prevPosition
        ) { 
            this.stopSound(this.audioHard.current, 40);
            this.stopSound(this.audioSoft.current, 40);
        }
    }

    playSound = () => {
        const audioHard = this.audioHard.current;
        const audioSoft = this.audioSoft.current;
        
        if (
            (audioHard.currentTime > 0 && audioHard.currentTime < 0.08)
            || (audioSoft.currentTime > 0 && audioSoft.currentTime < 0.08)
        ) {
            this.stopSound(audioHard, 80);
            audioSoft.currentTime = 0;
            audioSoft.volume = this.props.softVolume;
            audioSoft.play();
        } else {
            this.stopSound(audioSoft, 80);
            audioHard.currentTime = 0;
            audioHard.volume = this.props.hardVolume;
            audioHard.play();
        }

        if (this.props.isHiHat) {
            this.props.setHiHatPosition(this.props.type);
        }


        this.props.setDisplay(this.props.type);

        // Shift color by random amount for each note played
        //this.props.setBaseHue(Math.random() * 10, true);
    }

    stopSound = (audioRef, delay = 0) => {
        setTimeout(() => {
            audioRef.volume = 0;
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
                    ref={this.audioHard} 
                    id={this.props.triggerKey.toUpperCase()}
                    className="clip"
                    src={this.props.hardSound} 
                    onCanPlayThrough={() => this.props.incrementLoadedCount()}
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