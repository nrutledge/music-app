import React from 'react';
import { connect } from 'react-redux';
import { timerStart, 
    timerStop, 
    timerRestart, 
    tempoChange, 
    toggleRecord, 
    clearRecording 
} from '../../actions';
import './Controls.css';

// Number of slices to record per bar
const precision = 96;

const Controls = (props) => {
    const barLength = 240 / props.tempo;
    const interval = barLength / precision * 1000;
    const timerStart = () => props.timerStart(interval);
    const recordingStatus = props.controls.isRecordingOn ? 'on' : '';
    const currentbar = Math.floor(props.controls.playIndex / 96) + 1;
    const currentBeat = Math.floor((props.controls.playIndex / 24 % 4)) + 1;
    return (
        <div className="controls">
            <div className="controls-section">
            </div>
            <div className="controls-section">
                <button className="button-play" onClick={timerStart}>Play</button>
                <button 
                    className={'button-record ' + recordingStatus} 
                    onClick={props.toggleRecord}
                >Record</button>
                <button className="button-stop" onClick={props.timerStop}>Stop</button>
                <button className="button-restart" onClick={props.timerRestart}>Restart</button>
                <div className="play-position">{`${currentbar} ${currentBeat}`}</div>
                <input 
                    className="tempo" 
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

const mapStateToProps = ({ controls, tempo }) => ({ controls, tempo });
const mapDispatchToProps = { 
    timerStart, 
    timerStop, 
    timerRestart, 
    tempoChange, 
    toggleRecord, 
    clearRecording 
};
export default connect(mapStateToProps, mapDispatchToProps)(Controls);