'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Intermission from '../components/intermission';

import * as AppActions from '../actions/appActions';

import { connect } from 'react-redux';

class IntermissionContainer extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const { state, actions } = this.props;
		return (
			<Intermission
				episode = {state.app.episode}
			/>
		);
	}

} 


export default connect(state => ({
		state: state
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}, AppActions), dispatch)
	}) 
)(IntermissionContainer);