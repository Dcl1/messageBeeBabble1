'user strict';

import React, { Component } from 'react';
import {
	TabBarIOS,
	Text,
	StyleSheet
} from 'react-native';


// import screens here
import Messages from './containers/messageContainer';
import Conversation from './containers/convoContainer';
// end of import screens here


import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//const RouterWithRedux = connect()(Router);


module.exports = React.createClass({

	componentWillMount: function(){


	},

	backCall: function(){
		Actions.pop();
	},


	render: function(){
		return (
			<Router>
			<Scene key='roots' style={styles.container} >
				<Scene key="Messages" title="Recent" >
					<Scene key="MessageList" title="Messages" component={Messages} initial={true} />
					<Scene key="Conversation" title="Conversation" component={Conversation} onBack={this.backCall} />
				</Scene>	
			</Scene>
			</Router>
		);
	}


});



var styles = StyleSheet.create({
	container: {
		backgroundColor: 'aliceblue'
	}

});




