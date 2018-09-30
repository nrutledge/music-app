import React from 'react';
import { connect } from 'react-redux';
import { timerStart, timerStop, timerRestart } from '../../actions';
import './Controls.css';

const tempo = 80;

// Set interval for each tick equal to a 128th note
const interval = tempo / 60 / 32 * 1000;

const Controls = (props) => {
    const timerStart = () => props.timerStart(interval);
    return (
        <div className="controls">
            <button className="button-play" onClick={timerStart}>Play</button>
            <button className="button-stop" onClick={props.timerStop}>Stop</button>
            <button className="button-restart" onClick={props.timerRestart}>Restart</button>
            <div className="play-position">{props.playIndex}</div>
        </div>
    )
}

const mapStateToProps = ({ playIndex }) => ({ playIndex });
export default connect(mapStateToProps, { timerStart, timerStop, timerRestart })(Controls);