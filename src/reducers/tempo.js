import { TEMPO_CHANGE } from '../actions/types';

const tempo = (state = 80, action) => {
    switch (action.type) {
        case TEMPO_CHANGE:
            let newTempo = action.payload.tempo;
            if (typeof newTempo === 'string') {
                newTempo = parseFloat(newTempo);
            }
            return newTempo;
        default:
            return state;
    }
}

export default tempo;