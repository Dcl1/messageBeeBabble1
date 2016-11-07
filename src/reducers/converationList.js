import * as types from '../actions/actionTypes';


const initialState = {

	clist: [
		{
			id: 0,
			convo: []
		}

	]

}


export default function convoList(state = initialState, action ={}){

	switch(action.type) {

		case types.UPDATECONVERSATIONLIST:

			return {

				...state,
				clist: [
					{
						id: action.id,
						convo: []

					}
					...state.clist
				]

			};

		case types.UPDATECONVERSATION:

			return {
				...state,
				clist: state.clist.map(cv => 
						cv.id === action.id ?
						{...cv,
							convo: [
								...cv.convo,
								{
									option : action.option,
									user : action.user,
									position : action.position,
									text : action.text
								}
							]

						} : cv
					)
			};

		default :
			return state

	}

}