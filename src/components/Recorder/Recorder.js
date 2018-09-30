import React, { Component } from 'react';
import './Recorder.css';

class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: [],
            playbackIndex: 0
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.state.recording);

        if (this.props.keysDown !== prevProps.keysDown) { 
            this.recordPlayedKeys(this.props.currentTime, this.props.keysDown);
        }
    }

    recordPlayedKeys = (ctxCurrentTime, keysDown) => {
        const recordingStartTime = (this.state.recording[0] && this.state.recording[0].time) ? 
            this.state.recording[0].time : ctxCurrentTime;

        const elapsedTime = ctxCurrentTime - recordingStartTime;
        const noteIndex = Math.round(elapsedTime * 50);
        const existingKeysAtIndex = this.state.recording[noteIndex];
        let newRecording = [...this.state.recording];

        if (!existingKeysAtIndex) {
            newRecording[noteIndex] = { time: ctxCurrentTime };
        }
        newRecording[noteIndex] = { ...newRecording[noteIndex], keysDown };
        this.setState({ recording: newRecording });
    }

    playRecording = (isPlaybackOn, recording, playbackIndex) => {
        if (!isPlaybackOn || !recording || !recording[playbackIndex]) { 
            return; 
        }

        setInterval(() => {
            const keysToPlay = recording[playbackIndex];
            playbackIndex++

            keysToPlay && this.setState({ keysDown: keysToPlay });
        }, 1000 / 50)

        this.setState({ isPlaybackOn: true });
    };

    playAndRecord = (recording, recordingIndex, isRecordingOn, isPlaybackOn) => {
        if (!recording || !recordingIndex) { return; }

        setInterval(() => {
            const keysToPlay = recording[playbackIndex];
            
            keysToPlay && this.setState({ keysDown: keysToPlay });
            playbackIndex++
        }, 1000 / 50)

        this.setState({ isPlaybackOn: true });
    };

    render() {
        return (
            <div className="header">
                <button className="button-play" onClick={() => {
                this.playRecording(true, this.state.recording, 0);
                }} >Play</button>
          </div>
        )
    }
}

export default Recorder;