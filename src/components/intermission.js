import React from 'react';
import Button from 'react-native-button';

import { Actions } from 'react-native-router-flux';

import {
	View,
	StyleSheet,
	Text,
	ListView,
	Image,
	TouchableHighlight
} from 'react-native';




module.exports = React.createClass({

	_handlePress: function(){

		Actions.pop();

	},


	render: function(){
		return (
			<View style={styles.container}>
				<View style={styles.viewPort}>

				</View>
				<View style={styles.textCont}>
					<Text style={styles.bigText}>
						
					</Text>
					<Button
				        style={{fontSize: 20, color: 'green'}}
				        styleDisabled={{color: 'red'}}
				        onPress={() => this._handlePress()}>
					
						Next
					</Button>
				</View>
			</View>
		);
	}


});

var styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	viewPort: {
		flex:1,
		backgroundColor: 'grey'
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

