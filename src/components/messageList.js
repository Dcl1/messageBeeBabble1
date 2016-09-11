import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	ListView,
	TouchableHighlight
} from 'react-native';

// Actions for switching screens
import { Actions } from 'react-native-router-flux';
// End of Actions for switching screens


module.exports = React.createClass({

	getInitialState: function(){

	},

	render: function(){
		return (
			<View>
				<ListView

				/>
			</View>
		);
	},

	_renderRow: function(rowData: string, sectionID: number, rowID: number ){
		return (
			<TouchableHighlight >

			<TouchableHighlight />
		);
	}


});