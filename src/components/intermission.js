import React from 'react';
import Button from 'react-native-button';

import Video from 'react-native-video';

import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {
	View,
	StyleSheet,
	Text,
	ListView,
	Image,
	TouchableHighlight
} from 'react-native';

var storage = firebase.storage();
var storageRef = storage.ref();


module.exports = React.createClass({


	getInitialState: function(){

		return {
			theUrl: 'https://facebook.github.io/react/img/logo_og.png',
		}

	},


	componentWillMount: function(){

		var _this = this;

		firebase.auth().onAuthStateChanged( function(user) {

			if(user) {
				_this.callUrl();
			} else {

			}

		});

	},


	callUrl: function(){

		var _this = this;

		var mediaRef = storageRef.child("football");
		mediaRef.getDownloadURL().then(function(url){

			_this.setState({
				thisUrl: url
			});

		}).catch(function(error){
			
		  switch (error.code) {
		    case 'storage/object_not_found':
		    	console.log("File doesn't exist");
		      // File doesn't exist
		      break;

		    case 'storage/unauthorized':
		    	console.log("User doesn't have permission to access the object");
		      // User doesn't have permission to access the object
		      break;

		    case 'storage/canceled':
		    	console.log("User canceled the upload");
		      // User canceled the upload
		      break;

		    case 'storage/unknown':
		    	console.log("Unknown error occurred, inspect the server response");
		      // Unknown error occurred, inspect the server response
		      break;
		  }
		});

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















