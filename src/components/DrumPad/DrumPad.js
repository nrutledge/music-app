import React, { Component } from 'react';
import './DrumPad.css';

class DrumPad extends Component {
    constructor(props) {
        super(props);
        this.audio = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
      }

    componentDidUpdate() {
        console.log(this.props.hiHatPosition)        

        if (this.props.hiHatPosition === 'open' && this.props.currentHiHatPosition === 'closed') { 
            this.stopSound();
        }
    }
    
    handleKeyDown = (e) => {
        if (e.key === this.props.triggerKey) {
            this.playSound();

            const hiHatPos = this.props.hiHatPosition;

            if (hiHatPos) {
                this.props.setHiHatPosition(hiHatPos);
            }
        }
    }

    playSound = () => {
        const audio = this.audio.current;
        
        audio.currentTime = 0;
        audio.play();
    }

    stopSound = () => {
        const audio = this.audio.current;
        audio.pause();
    }
 
    render() {
        return (
            <button className="drum-pad" onClick={this.playSound}>
                {this.props.triggerKey.toUpperCase()}
                <audio 
                    ref={this.audio} 
                    id={this.props.triggerKey.toUpperCase()}
                    src={this.props.src} 
                    preload="auto" 
                >
                </audio>
            </button>
        );
    }
}

export default DrumPad