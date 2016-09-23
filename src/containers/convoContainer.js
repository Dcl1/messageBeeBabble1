'use strict';

import React, {Component} from 'react';

import Conversation from '../components/conversation';


class ConvoContainer extends Component {

	constructor(props) {
		super(props);
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