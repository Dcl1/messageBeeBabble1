import * as types from '../actions/actionTypes';


const initialState = {

	clist: [
		{
			id: 444,
			convo: []
		},
		{
			id: 888,
			convo: []
		}

	]

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.UPDATECONVERSATIONLIST:

			//console.log("UPDATECONVERSATIONLIST");
			console.log(state);
			//console.log(action);

			return {

				...state,
				clist: [
					{
						id: action.id,
						convo: action.convo

					},
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