import React from 'react';
import Button from 'react-native-button';

import Video from 'react-native/video';

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


	getInitialState: function(){

		return {
			theUrl: 'https://facebook.github.io/react/img/logo_og.png',
		}

	},


	_handlePress: function(){

		Actions.pop();

	},


	render: function(){
		return (
			<View style={styles.container}>
				<View style={styles.viewPort}>
					<Video
						style={styles.video}
						rate={1}
						source = {{uri: this.state.theUrl}}
						repeat = {true}
						volume={1.0}
					/>
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
	video: {
		flex: 1
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

