import * as types from '../actions/actionTypes';

const initialState = {
		above: false,
		mlist : []
}





export default function messagesreducer(state = initialState, action) {
	switch (action.type) {

		case types.ABOVEONE:

			return {

				...state,
				above: true

			}

		case types.UPDATEMESSAGELIST:

			console.log(state);

			if(state.adove > 1 ) {

				console.log("Above one");

				return {
					...state,
					mlist: state.mlist.map(msg =>
							msg.id === action.id ?
							{...msg,
								id: action.id,
								active: action.active,
								user: action.user,
								text: msg.text,
								start: msg.start
							} : msg
						)
				};

			} else {

				console.log("not above one");

				return {
					...state,
					mlist: [
						{
							id: action.id,
							active: action.active,
							user: action.user,
							text: action.text,
							start: action.start
						},
						...state.mlist
					]
				};

			}




		// case types.UPDATEMESSAGELIST:

		// 	return {
		// 		...state,
		// 		mlist: [
		// 			{
		// 				id: action.id,
		// 				active: action.active,
		// 				user: action.user,
		// 				text: action.text,
		// 				start: action.start
		// 			},
		// 			...state.mlist
		// 		]
		// 	};

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