import * as types from '../actions/actionTypes';

const initialState = [
	{
		user: 'Nobody',
		text: 'Nobody wants to say something to you',
		active: true,
		id: 0
	}
]


export default function messagesreducer(state = initialState, action) {
	switch (action.type) {
		case types.UPDATEMESSAGELIST:
			return [
				{
					id: action.id,
					complete: true,
					user: action.user,
					text: action.text
				},
				...state
			]

		default: 
			return state
	}

}