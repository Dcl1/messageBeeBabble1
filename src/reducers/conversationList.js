import * as types from '../actions/actionTypes';


const initialState = {

	clist: []

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.ADDCONVOMESSAGE:

			console.log(state);

			function hasValue(obj, value) {
				return obj.hasOwnProperty("convoid") && obj.convoid === value;
			}

			let list = state.clist;
			let id = action.convoid - 1;
			let convo;



			let isAlreadyExist = list.some(function(obj){
				return hasValue(obj, action.convoid);
			});

			console.log(isAlreadyExist);
			if(isAlreadyExist){

				list.map(function(obj, index){

					console.log(index);

					if(obj.convoid === action.convoid){
						obj.convo.map(function(msg){
							if(msg.stepid !== action.stepid){
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
						});

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