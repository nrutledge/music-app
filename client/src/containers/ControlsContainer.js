import { connect } from 'react-redux';
import { 
  timerStart, 
  timerStop, 
  timerRestart, 
  tempoChange, 
  toggleRecord, 
  clearRecording
} from '../actions';
import Controls from '../components/Controls/Controls';

const mapStateToProps = ({ controls: { playIndex, status, isPlaying, isRecordingOn, tempo }}) => {
  return {
    playIndex, 
    status, 
    isPlaying,
    isRecordingOn, 
    tempo 
  }
};

const mapDispatchToProps = { 
  timerStart, 
  timerStop, 
  timerRestart, 
  tempoChange, 
  toggleRecord, 
  clearRecording
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);