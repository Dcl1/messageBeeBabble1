'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';

import MessageList from '../components/messageList';
import * as MessageActions from '../actions/messageActions';

import * as AppActions from '../actions/appActions';
/* This is where you would import actions from */

/* This is the end of where you would import actions from */


import { connect } from 'react-redux';

class MessageContaner extends Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate(prevProps, prevState){

		const { state, actions } = this.props;

	}	

	render() {
		const { state, actions } = this.props;



		return (
			<MessageList
				episode={ state.app.episode }
				list= { state.messages.mlist }
				appStep = {state.app.step}
				{...actions}
			/>
		);
	}

}


export default connect(state => ({
		state: state	
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}, MessageActions, AppActions), dispatch)
	})
)(MessageContaner);