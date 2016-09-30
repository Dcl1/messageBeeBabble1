import * as types from '../actions/actionTypes';

const initialState = {
		mlist : []
}





export default function messagesreducer(state = initialState, action) {
	switch (action.type) {

		case types.UPDATEMESSAGELIST:
			return {
				...state,
				mlist: [
					{
						id: action.id,
						complete: true,
						user: action.user,
						text: action.text,
						start: action.start
					},
					...state.mlist
				]
			};

		case types.ADDTOMESSAGELIST:

			console.log("New Update Message list is called");

			return {
				...state,
				mlist: [
					
				]
			};

		case types.UPDATEMESSAGESTEP:

			console.log("UPDATEMESSAGESTEP CALLED");

			return {
				...state,
				mlist: state.mlist.map(msg =>
						msg.id === action.id ?
						{...msg, start: action.step} :
						msg

					)	
			}


		default: 
			return state
	}

}