import * as types from '../actions/actionTypes';

const initialState = {
		mlist : [
		{
			user: 'Nobody',
			text: 'Nobody wants to say something to you',
			active: true,
			id: 0,
			start: 1
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

		default: 
			return state
	}

}