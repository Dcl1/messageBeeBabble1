import * as types from './actionTypes';

export function updatemessagelist(user, text, active, id){
	return {
		type: types.UPDATEMESSAGELIST,
		user,
		text,
		active,
		id
	}
}