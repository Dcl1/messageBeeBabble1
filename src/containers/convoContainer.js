'use strict';

import React, {Component} from 'react';

import Conversation from '../components/conversation';


import * as AppActions from '../actions/appActions';
import * as MessageActions from '../actions/messageActions';


import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';




class ConvoContainer extends Component {

	constructor(props) {
		super(props);
	}

	// componentWillReceiveProps(nextProps){
	// 	//console.log("That's an update : " + nextProps.cid);
	// 	if(nextProps.cid !== this.props.cid) {
	// 		//console.log("This is definitely a different convo");
	// 	}
	// }

	componentDidUpdate(prevProps, prevState){


	}


	render(){

		const { state, actions } = this.props;
		var cID = this.props.cid;
		var ste = this.props.start;
		var epi = this.props.epi;


		return (
			<Conversation
				episode={1}
				convoID={cID}
				start={ste}
				{...actions}
			/>
		);
	}

}


export default connect(state => ({
		state: state
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}, AppActions, MessageActions), dispatch)
	})
)(ConvoContainer);














