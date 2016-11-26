import * as types from '../actions/actionTypes';


const initialState = {

	clist: [
		{
			convoid: 1,
			convo: []
		},
		{
			convoid: 2,
			convo: [
				{
					id: 44,
					user: "non",
					position: "right",
					text: "dummy text"
				}
			]
		}
	]

}


export default function convoList(state = initialState, action = {}){

	switch(action.type) {

		case types.ADDCONVOMESSAGE:

			console.log("Add Convo Message");
			//console.log(state);

			function hasValue(obj, value) {
				return obj.hasOwnProperty("convoid") && obj.convoid === value;
			}

			let list = state.clist;

			let idAlreadyExist = list.some(function(obj){

				return hasValue(obj, action.convoid);
				//console.log(val);

			});



			//console.log(idAlreadyExist);
			let id = action.convoid - 1;
			let convo;


			if (idAlreadyExist) {

				console.log(state.clist[id].convo);

				// return {
				// 	...state,
				// 	clist[id].convo: [
				// 		{
				// 			id: action.id,
				// 			user: action.user,
				// 			position: action.position,
				// 			text: action.text
				// 		},
				// 		...state.clist[id]
				// 	]
				// };
			} 


			return state;


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