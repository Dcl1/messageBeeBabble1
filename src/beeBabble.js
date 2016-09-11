'user strict';

import React, { Component } from 'react';
import {
	TabBarIOS,
	Text,
	StyleSheet
} from 'react-native';


// import screens here
import MsgList from './components/messageList';
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
					<Scene key="MessageList" title="Messages" component={MsgList} initial={true} />
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




