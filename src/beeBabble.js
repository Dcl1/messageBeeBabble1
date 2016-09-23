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


import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

//const RouterWithRedux = connect()(Router);


module.exports = React.createClass({

	componentWillMount: function(){

		console.log("BeeBabble Mounted");

	},


	render: function(){
		return (
			<Router>
			<Scene key='roots' style={styles.container} >
				<Scene key="Messages" title="Recent" >
					<Scene key="MessageList" title="Messages" component={Messages} initial={true} />
					<Scene key="Conversation" title="Conversation" component={Conversation} />
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




