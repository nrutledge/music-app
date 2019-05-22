import React from 'react';
import './Controls.css';
import { FaPlay, FaStop, FaCircle, FaBackward, FaTrash } from 'react-icons/fa';

// Number of slices to record per bar
const precision = 96;

export default (props) => {
    // Length of each bar in seconds (60 / beats per minute * 4)
    const barLength = 240 / props.tempo;

    // Length of each slice of the recording in milliseconds
    const interval = barLength / precision * 1000;

    const currentBar = Math.floor(props.playIndex / precision) + 1;
    const currentBeat = Math.floor((props.playIndex / (precision / 4) % 4)) + 1;
    const playButtonStyle = (props.isPlaying && !props.isRecordingOn && ' controls__button--green') || '';
    const recordButtonStyle = props.isRecordingOn ? ' controls__button--red' : '';

    const play = () => {
      if (props.isRecordingOn) {
        props.toggleRecord();
      } else {
        props.timerStart(interval)
      }
    };
    const stop = () => {
      if (props.isRecordingOn) {
        props.toggleRecord();
      }
      props.timerStop();
    }
    const startRecording = () => {
      if (!props.isRecordingOn) {
        props.toggleRecord();
        play();
      } else {
        stop();
      }
    }

    // Preventing event from being passed in (should only be instrumentId)
    const clearRecording = () => props.clearRecording();;

    return (
        <div className="controls">
            <div className="controls__section">
              <button className="controls__button" onClick={props.timerRestart}>
                <FaBackward /><span className="controls__button-text"> Restart</span>
              </button>
              <button className="controls__button" onClick={stop}>
                <FaStop /><span className="controls__button-text"> Stop</span>
              </button>
              <button className={'controls__button' + playButtonStyle} onClick={play}>
                <FaPlay /><span className="controls__button-text"> Play</span> 
              </button>
              <button 
                  className={'controls__button' + recordButtonStyle} 
                  onClick={startRecording}
              >
                <FaCircle /><span className="controls__button-text">  Record</span>
              </button>
            </div>
            <div className="controls__section">
              <label className="controls__label" htmlFor="play-position">Position</label>
              <div className="controls__display-data" name="play-position">
                {`${currentBar} ${currentBeat}`}
              </div>
              <label className="controls__label" htmlFor="tempo">Tempo</label>
              <input 
                  className="controls__display-data controls__display-data--tempo" 
                  name="tempo"
                  type="number" 
                  onChange={(e) => {
                    e.stopPropagation();
                    props.tempoChange(e.target.value);
                  }} 
                  value={props.tempo} 
              />
            </div>
            <div className="controls__section">
              <button className="controls__button controls__button-clear" onClick={clearRecording}>
                Clear Recording
              </button>
            </div>
        </div>
    )
}