import * as types from '../actions/actionTypes';


const initialState = {

	clist: [
		{
			convoid: 1,
			convo: []
		}
	]

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.ADDCONVOMESSAGE:

			let idAlreadyExist;


			console.log(action);
			console.log("ADDCONVOMESSAGE");


			//let idAlreadyExist = state.clist.indexOf(action.convoid) ? -1;
			// state.clist.map(function(obj){
			// 	if(obj.convoid == action.convoid ) {
			// 		idAlreadyExist = true;
			// 	} else {
			// 		idAlreadyExist = false;
			// 	}
			// });

			function hasValue(obj, value) {
				return obj.hasOwnProperty("convoid") && obj.convoid === value;
			}


			var list = state.clist;

			//let idAlreadyEst = hasValue(, action.convoid);


			list.map(function(obj){
				console.log(obj);
			});


			//let idAlreadyExist = state.clist.indexOf(action.convoid) ? -1;
	


			//console.log(idAlreadyExist);


			// let clist = state.clist.slice();


			// if(idAlreadyExist) {
			// 	clist = clist.filter(convoid => convoid == action.convoid);

			// } else {

			// }



			return state

		// case types.UPDATECONVERSATIONLIST:

		// 	//console.log("UPDATECONVERSATIONLIST");
		// 	console.log(state);
		// 	//console.log(action);

		// 	return {

		// 		...state,
		// 		clist: [
		// 			{
		// 				id: action.id,
		// 				convo: action.convo

		// 			},
		// 			...state.clist
		// 		]

		// 	};

		// case types.UPDATECONVERSATION:

		// 	return {
		// 		...state,
		// 		clist: state.clist.map(cv => 
		// 				cv.id === action.id ?
		// 				{...cv,
		// 					convo: [
		// 						...cv.convo,
		// 						{
		// 							option : action.option,
		// 							user : action.user,
		// 							position : action.position,
		// 							text : action.text
		// 						}
		// 					]

		// 				} : cv
		// 			)
		// 	};

		default :
			return state

	}

}