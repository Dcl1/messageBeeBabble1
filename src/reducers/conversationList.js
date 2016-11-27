import * as types from '../actions/actionTypes';


const initialState = {

	clist: [
		{
			convoid: 1,
			convo: []
		},
		{
			convoid: 2,
			convo: []
		}
	]

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.ADDCONVOMESSAGE:

			//console.log(state);

			function hasValue(obj, value) {
				return obj.hasOwnProperty("convoid") && obj.convoid === value;
			}

			let list = state.clist;
			let id = action.convoid - 1;
			let convo;



			let isAlreadyExist = list.some(function(obj){
				return hasValue(obj, action.convoid);
			});


			if(isAlreadyExist){

				list.map(function(obj){
					if(obj.convoid === action.convoid){
						return {
							...state,
							clist: state.clist[id].convo.push(
								{
									"text" : action.text,
									"name" : action.user,
									"position" : action.position,
									"image" : action.img,
									"date" : new Date(),
									"uniqueId" : action.id,
									"stepid" : action.stepid
									
								}	
							)

						}
					}
				});

			} else {
				return state;
			}



		default :
			return state

	}

}