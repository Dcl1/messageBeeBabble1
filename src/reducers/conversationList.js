import * as types from '../actions/actionTypes';


const initialState = {

	clist: []

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.ADDCONVOMESSAGE:

			console.log(state);

			function hasValue(obj, key, value) {
				return obj.hasOwnProperty(key) && obj[key] === value;
			}

			let list = state.clist;
			let id = action.convoid - 1;
			let convo;


			if(list.some(function(obj){ return hasValue(obj, "convoid" , action.convoid) })){

				list.map(function(obj, index){

					if(obj.convoid === action.convoid){

						if(obj.convo.some(function(msg){ return hasValue(msg, "stepid" ,  action.stepid)}) !== true){

							return {
								...state,
								clist: state.clist[index].convo.push(
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
						} else {
							return state;
						}

					}
				});



			} else {
				return {
					...state,
					clist: [
						{
							convoid: action.convoid,
							convo: [
								{
									"text" : action.text,
									"name" : action.user,
									"position" : action.position,
									"image" : action.img,
									"date" : new Date(),
									"uniqueId" : action.id,
									"stepid" : action.stepid
								}
							]
						},
						...state.clist
					]
				}
			}



		default :
			return state

	}

}