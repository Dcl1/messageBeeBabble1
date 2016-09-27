'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import MessageList from '../components/messageList';
import * as MessageActions from '../actions/messageActions';
/* This is where you would import actions from */

/* This is the end of where you would import actions from */


import { connect } from 'react-redux';

class MessageContaner extends Component {

	constructor(props) {
		super(props);
	}

	componentWillUpdate(nextProps, nextState){
	}	

	render() {
		const { state, actions } = this.props;

		return (
			<MessageList
				episode={ state.app.episode }
				list= { state.messages.mlist }
				{...actions}
			/>
		);
	}

}


export default connect(state => ({
		state: state	
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}, MessageActions), dispatch)
	})
)(MessageContaner);