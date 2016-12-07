import * as types from '../actions/actionTypes';

const initialState = {

	clist: []

}


export default function convoList( state = initialState, action = {} ) {

	switch(action.type) {
		case types.CREATECONVO:

			console.log("CREATECONVO");

			return {
				...state,
				clist: [
					{
						convoid: action.convoid,
						convo: []
					},
					...state.clist
				]
			}

		case types.ADDCONVOMESSAGE:

			console.log("ADDCONVOMESSAGE");

			let list = state.clist;

			list.map(function(obj, index){

				if( obj.convoid === action.convoid ){
					return {
						...state.clist[index],
						convo: [
							{
								"text" : action.text,
								"name" : action.user,
								"position" : action.position,
								"image" : action.img,
								"date" : new Date(),
								"uniqueId" : action.id,
								"stepid" : action.stepid
							},
							...state.clist[index.convo]
						]
					}
				} else {
					return state;
				}

			});


		default :
			return state;

	}

}