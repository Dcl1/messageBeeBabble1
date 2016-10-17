import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	ListView,
	Image,
	TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';


module.exports = React.createClass({


	render: function(){
		return (
			<View style={styles.container}>
				<View style={styles.textCont}>
					<Text style={styles.bigText}>
						Number!
					</Text>
				</View>
			</View>
		);
	}


});

var styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'column'
	},
	textCont: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	bigText: {
		fontSize: 12
	}

});

