import * as types from '../actions/actionTypes';

const initialState = {
		mlist : [
		{
			user: 'Nobody',
			text: 'Nobody wants to say something to you',
			active: true,
			id: 0
		}
	]
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

			console.log("Update Message List was called");

			return {
				...state,
				mlist: [
					{
						id: action.id,
						complete: true,
						user: action.user,
						text: action.text
					},
					...state.mlist
				]
			};

		default: 
			return state
	}

}