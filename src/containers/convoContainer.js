'use strict';

import React, {Component} from 'react';

import Conversation from '../components/conversation2';


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


	render(){

		const { state, actions } = this.props;
		var cID = this.props.cid;
		var ste = this.props.start;
		var mlist = state.messages.mlist;
		var conti;

		mlist.map(function(obj){
			if ( obj.id == cID ){
				conti = obj.continue;
			}
		});

		return (
			<Conversation
				episode={1}
				convoID={cID}
				start={ste}
				conti={conti}
				{...actions}
			/>
		);
	}

}


export default connect(state => ({
		state: state
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}, MessageActions ,AppActions), dispatch)
	})
)(ConvoContainer);














