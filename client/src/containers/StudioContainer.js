import { connect } from 'react-redux';
import { keyPress } from '../actions';
import Studio from '../components/Studio/Studio';

export default connect(null, { keyPress })(Studio);