import * as types from '../actions/actionTypes';
import { Actions } from 'react-native-router-flux';


const initialState = {
	episode: 1,
	step: 1
};



export default function appreducer(state = initialState, action = {}) {

	switch(action.type) {

		case types.NEXTEPISODE:

			var statee = state;

			setTimeout(() => {
				Actions.Intermission();

			}, 11000);
			return {
				...state,
				episode: state.episode+1,
				step: 1
			}

		case types.UPDATESTEP:
			return {
				...state,
				step: state.step + 1
			}
		default: 
			return state;
	}

}