import * as types from '../actions/actionTypes';


const initialState = {

	clist: []

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.ADDCONVOMESSAGE:

			console.log(state);

			function hasValue(obj, key, value) {

				console.log("hasValue called " + key);
				return obj.hasOwnProperty(key) && obj[key] === value;
			}

			let list = state.clist;
			let id = action.convoid - 1;
			let convo;


			


			let isAlreadyExist = list.some(function(obj){
				return hasValue(obj, "convoid" , action.convoid);
			});


			console.log("isAlreadyExist " + isAlreadyExist);

			if(list.some(function(obj){ return hasValue(obj, "convoid" , action.convoid) })){

				list.map(function(obj, index){

					if(obj.convoid === action.convoid){
						
						// let isAlreadyMsg = obj.convo.some(function(msg){
						// 	return hasValue(msg, "stepid" ,  action.stepid);
						// });

						console.log("action.stepid being called " + action.stepid);

						if(obj.convo.some(function(msg){ return hasValue(msg, "stepid" ,  action.stepid)}) !== true){

							console.log("If statement action.stepid");

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

							console.log("Else statement action.stepid");

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