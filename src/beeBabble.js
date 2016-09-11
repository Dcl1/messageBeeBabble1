'user strict';

import React, { Component } from 'react';
import {
	TabBarIOS,
	Text,
	StyleSheet
} from 'react-native';


// import screens here

// end of import screens here


import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

const RouterWithRedux = connect()(Router);


module.exports = React.createClass({


	getInitialState: function() {
		return {

		}
	},

	render: function(){
		return (
			<Scene key='roots' >
				<Scene key="Messages" title="Recent">
					
				</Scene>
			</Scene >
		);
	}


});



var styles = StyleSheet.create({
	container: {
		backgroundColor: 'aliceblue'
	}

});




