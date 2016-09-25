'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import EpisodeCounter from '../components/epiList/episodeCounter';

//import * AppActions from '../actions/appActions';

import { connect } from 'react-redux';



class CounterContainer extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const { state, actions } = this.props;
		return (
			<EpisodeCounter
				count={state.app.step}
			/>
		);
	}
}



export default connect(state => ({
		state: state
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}), dispatch)
	})
)(CounterContainer);