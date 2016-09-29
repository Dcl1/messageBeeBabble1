import * as types from './actionTypes';

export function updatemessagelist(user, text, active, id, start){
	return {
		type: types.UPDATEMESSAGELIST,
		user,
		text,
		active,
		id,
		start
	}
}


export function updatemessagestep(id, step){
	return {
		type: types.UPDATEMESSAGESTEP,
		id,
		step
	}
}