import * as types from '../actions/actionTypes';

const initialState = {

		mlist : []
}





export default function messagesreducer(state = initialState, action) {
	switch (action.type) {


		case types.STARTMESSAGELIST:

			return {
				...state,
				mlist: [
					{
						id: action.id,
						active: action.active,
						user: action.user,
						text: action.text,
						start: action.start
					},
					...state.mlist
				]
			};

		case types.UPDATEMESSAGELIST:


			return {
				...state,
				mlist: state.mlist.map(msg =>
						msg.id === action.id ?
						{...msg,
							id: action.id,
							active: action.active,
							user: action.user,
							text: msg.text,
							start: msg.start
						} : msg
					)
			};

		case types.ADDTOMESSAGELIST:


			return {
				...state,
				mlist: [
					
				]
			};
		case types.UPDATEMESSAGEACTIVE:

			return {
				...state,
				mlist: state.mlist.map(msg => 
						msg.id === action.id ?
						{...msg, active: action.active} :
						msg

					)

			}


		case types.UPDATEMESSAGESTEP:


			return {
				...state,
				mlist: state.mlist.map(msg =>
						msg.id === action.id ?
						{...msg, start: action.step, text: action.text} :
						msg

					)	
			}


		default: 
			return state
	}

}