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
import Intermission from './containers/intermissionContainer';
// end of import screens here
import Firebase  from 'firebase';

import { Router, Scene, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//const RouterWithRedux = connect()(Router);


module.exports = React.createClass({

	componentWillMount: function(){

		var _this = this;

		Firebase.auth().signInAnonymously().catch(function(error){

			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);


		});


	},

	backCall: function(){
		Actions.pop();
	},

	resetCalled: function(){
		console.log("Reset called");
	},


	render: function(){
		return (
			<Router>
			<Scene key='roots' style={styles.container} >
				<Scene key="Messages" title="Recent" leftButtonImage={require('image!starFill')} leftTitle={null} onLeft={this.resetCalled.bind(null, this)} >
					<Scene key="MessageList" title="Messages" component={Messages} initial={true} />
					<Scene key="Conversation" title="Conversation" component={Conversation} onBack={this.backCall} />
				</Scene>
				<Scene key="Intermission" direction="vertical">
					<Scene key="intermissionModal" component={Intermission} panHandlers={null} schema="modal" title="Intermision" />
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




