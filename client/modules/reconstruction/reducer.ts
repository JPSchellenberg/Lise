import { assign } from 'lodash';
import ReconstructionState from './state';

import { 
	RECONSTRUCTION_SHOWSETTINGS,
	RECONSTRUCTION_SAVE
} from './constants';

export default function(state: ReconstructionState = new ReconstructionState(), action): ReconstructionState {
	switch(action.type) {
		case RECONSTRUCTION_SHOWSETTINGS:
			return assign({}, state, { showSettings: !state.showSettings });

		case RECONSTRUCTION_SAVE:
			return assign({}, state, action.state, { showSettings: false});

		default:
			return state;
	}
	
}