import * as types from './actionTypes';

export function updateconversationlist(id, convo) {

	return {
		type: types.UPDATECONVERSATIONLIST,
		id,
		convo
	}

}


export function updateconversation(id, option, user, position, text ){

	return {
		type: types.UPDATECONVERSATION,
		option,
		user,
		position,
		text 
	}

}