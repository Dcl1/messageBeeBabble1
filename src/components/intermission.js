import React from 'react';
import Button from 'react-native-button';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

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
			theImage: 'https://facebook.github.io/react/img/logo_og.png',
			theUrl: ''
		}

	},


	componentWillMount: function(){

		var _this = this;

		firebase.auth().onAuthStateChanged( function(user) {

			if(user) {
				_this.callUrl();
			} else {
				console.log("firebase auth() not working");
			}

		});

	},


	callUrl: function(){

		console.log("callURl");

		var _this = this;

		var mediaRef = storageRef.child("videos/football.mp4");
		mediaRef.getDownloadURL().then(function(url){

			console.log("url " + url);

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
		    default: 
		    	console.log("default called " + error.code);
		    	break;
		  }
		});

	},


	_handlePress: function(){

		Actions.pop();

	},


	render: function(){

		console.log("https://firebasestorage.googleapis.com/v0/b/haven-117c1.appspot.com/o/videos%2Ffootball.mp4?alt=media&token=392b794d-7035-4029-b0bd-ff7c025bf3bc");
		console.log("state.theUrl " + this.state.theUrl);
		var _this = this;

		return (
			<View style={styles.container}>
				<View style={styles.viewPort}>



			        <VideoPlayer
			          endWithThumbnail
			          thumbnail={{ uri: this.state.theImage}}
			          video={{ uri: _this.state.theUrl }}
			          videoWidth={100}
			          videoHeight={100}
			          autoplay={true}
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















