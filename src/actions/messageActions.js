import * as types from './actionTypes';

export function addtomessagelist( user, text, active, id, start ){
	return {
		type: types.CREATEMESSAGELIST,
		user,
		text,
		active,
		id,
		start
	}
}


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


export function updatemessagestep(id, step, text){
	return {
		type: types.UPDATEMESSAGESTEP,
		id,
		step,
		text
	}
}