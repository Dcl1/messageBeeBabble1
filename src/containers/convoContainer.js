'use strict';

import React, {Component} from 'react';

import Conversation from '../components/conversation';


class ConvoContainer extends Component {

	constructor(props) {
		super(props);
	}

	


	componentWillReceiveProps(nextProps){

		//console.log("That's an update : " + nextProps.cid);


		if(nextProps.cid !== this.props.cid) {
			//console.log("This is definitely a different convo");
		}

	}

	componentWillUnmount(){
		console.log("This is an unmount");
	}


	render(){

		const { state, actions } = this.props;
		var cID = this.props.cid;

		return (
			<Conversation
				episode={1}
				convoID={cID}
			/>
		);
	}

}


export default ConvoContainer;