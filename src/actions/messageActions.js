import * as types from './actionTypes';




export function updatecontinue(id, cont) {

	console.log("reducer updatecontinue called " + id);

	return {
		type: types.UPDATECONTINUE,
		id,
		cont
	}
}


export function startmessagelist(user, text, active, id, start){

	return {
		type: types.STARTMESSAGELIST,
		user,
		text,
		active,
		id,
		start
	}

}



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

export function updatemessageactive(id, active){
	return {
		type: types.UPDATEMESSAGEACTIVE,
		id,
		active
	}
}













