import * as types from '../actions/actionTypes';


const initialState = {
	episode: 1,
	step: 1
};



export default function appreducer(state = initialState, action = {}) {

	switch(action.type) {
		case types.UPDATESTEP:
			return {
				...state,
				step: state.step + 1
			}
		default: 
			return state;
	}

}