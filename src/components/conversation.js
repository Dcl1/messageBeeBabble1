import React from 'react';
import {
	View,
	Text,
	ListView,
	TouchableHighlight,
	StyleSheet,
	Dimensions,
	Navigator
} from 'react-native';

import GiftedMessenger from 'react-native-gifted-messenger';
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
import { Actions } from 'react-native-router-flux';

import conversationOne from '../data/epOne/conversation.json';



module.exports = React.createClass({

	getInitialState: function(){

		this._Key;
		this._Episode;
		this._ConvoId;
		this._CurrentStep;
		this._messages = [];

		this._isMounted = false;

		return {
			isPlayer: false,
			messages: this._messages,
			typingMessage: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here'
		};
	},

	componentDidMount: function(){

		this.loadStartConvo();

	},

	componentWillReceiveProps: function(nextProps) {

		if(nextProps.convoID !== this.props.convoID) {
			Actions.pop();
		}

	},

	handleSend: function( message = {} ) {
		var _this = this;
		

	},


	getConvoFile: function( episode, conversationID ){
		console.log(episode + " , " + conversationID );

		switch(episode) {
			case 1 :
				return conversationOne.convo[conversationID];
			default: 
				console.log("That's a bust");
				return conversationOne.convo[conversationID];

		};

	},


	loadStartConvo: function(){

		var file = this.getConvoFile(this.props.episode, this.props.convoID);
		var startStep = file.startStep;
		this._CurrentStep = startStep;
		var arr = [];

		for(var i = 0; i <= startStep; i ++){

			var imgURL = file.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
			let uni = Math.round(Math.random() * 100000);

			arr.push({
				"text" : file.conversation[i].text , 
				"name" : file.conversation[i].user , 
				"position" : file.conversation[i].position , 
				"image" : imgURL , 
				"date" : new Date(2016, 0 ,1, 20, 0), 
				"uniqueId" : uni  
			})

		}


		// file.conversation.map(function(obj){

		// 	var imgURL = obj.position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		// 	let uni = Math.round(Math.random() * 10000);

		// 	arr.push({"text" : obj.text , "name" : obj.user , "position" : obj.position , "image" : imgURL , "date" : new Date(2016, 0 ,1, 20, 0), "uniqueId" : uni  })
		// });

		this.setState({
			messages: arr
		});

		this.checkNextMessage();
	},

	checkNextMessage: function(){

		var nextStep = this._CurrentStep + 1;

		var file = this.getConvoFile(this.props.episode, this.props.convoID);

		if( nextStep < file.conversation.length ) {
			var user = file.conversation[nextStep].user;

			if(user.toUpperCase() == 'PLAYER') {

				this.setState({
					responseUno: file.conversation[nextStep].text,
					responseDeuce: file.conversation[nextStep].text2
				});

			} else {

				this.setState({
					responseUno: '',
					responseDeuce: ''
				});

				this.renderNextMessage(nextStep);

			}

		} 


	},


	renderNextMessage: function(next) {

	},


	render: function(){
		return (
			<GiftedMessenger
				ref={(c) => this._GiftedMessenger = c}

				style={{
					marginTop: 66 + STATUS_BAR_HEIGHT,
				}}

				 autoFocus={false}

				 messages={this.state.messages}

				 handleSend={this.handleSend}

				 senderName= 'Awesome Developer'
				 senderImage={null}
				 displayNames={true}

				 parseText={true}


				 responseOne={this.state.responseUno}
				 responseTwo={this.state.responseDeuce}

			/>
		);
	}


});