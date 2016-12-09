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
					...state.mlist,
					{
						id: action.id,
						active: action.active,
						user: action.user,
						text: action.text,
						start: action.start,
						continue: true
					}
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
							start: msg.start,
							continue: true
						} : msg
					)
			};

		case types.UPDATECONTINUE:

			return {
				...state,
				mlist: state.mlist.map(msg =>
						msg.id === action.id ?
						{...msg,
							id: action.id,
							active: msg.active,
							user: msg.user,
							text: msg.text,
							start: msg.start,
							continue: action.cont
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