import React from 'react';
import './Controls.css';

// Number of slices to record per bar
const precision = 96;

export default (props) => {
    // Length of each bar in seconds (60 / beats per minute * 4)
    const barLength = 240 / props.tempo;

    // Length of each slice of the recording in milliseconds
    const interval = barLength / precision * 1000;

    const currentBar = Math.floor(props.playIndex / precision) + 1;
    const currentBeat = Math.floor((props.playIndex / (precision / 4) % 4)) + 1;
    const recordingStatus = props.isRecordingOn ? 'on' : '';

    const timerStart = () => props.timerStart(interval);

    return (
        <div className="controls">
            <div className="controls-section">
            </div>
            <div className="controls-section">
                <button className="button-play" onClick={timerStart}>Play</button>
                <button 
                    className={'button-record ' + recordingStatus} 
                    onClick={props.toggleRecord}
                >
                  Record
                </button>
                <button className="button-stop" onClick={props.timerStop}>
                  Stop
                </button>
                <button className="button-restart" onClick={props.timerRestart}>
                  Restart
                </button>
                <label className="controls-label" for="play-position">Position</label>
                <div className="play-position" name="play-position">
                  {`${currentBar} ${currentBeat}`}
                </div>
                <label className="controls-label" for="tempo">Tempo</label>
                <input 
                    className="tempo" 
                    name="tempo"
                    type="number" 
                    onChange={(e) => props.tempoChange(e.target.value)} 
                    value={props.tempo} 
                />
            </div>
            <div className="controls-section">
                <button className="button-clear" onClick={props.clearRecording}>
                    Clear Recording
                </button>
            </div>
        </div>
    )
}