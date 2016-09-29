import * as types from '../actions/actionTypes';

const initialState = {
		mlist : []
}

// const initialState = [
// 	{
// 		user: 'Nobody',
// 		text: 'Nobody wants to say something to you',
// 		active: true,
// 		id: 0
// 	}
// ]


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

		case types.UPDATEMESSAGESTEP:

			console.log("UPDATEMESSAGESTEP CALLED");

			return {
				...state,
				mlist: [
					state.mlist.map(msg =>
						msg.id === action.id ?
						{...msg, start: action.step} :
						msg

					)
				]
			}


		default: 
			return state
	}

}