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
			messages: [],
			typingMessage: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here'
		};
	},

	componentDidMount: function(){

		console.log("This is the start step " + this.props.start);
		var step = this.props.start;
		this.loadStartConvo(step);

	},

	componentWillReceiveProps: function(nextProps) {

		if(nextProps.convoID !== this.props.convoID) {
			Actions.pop();
		}

	},

	getConvoFile: function( episode, conversationID ){

		switch(episode) {
			case 1 :
				return conversationOne.convo[conversationID];
			default: 
				return conversationOne.convo[conversationID];

		};

	},


	loadStartConvo: function(ss){

		var file = this.getConvoFile(this.props.episode, this.props.convoID);
		//var startStep = this.props.start;
		//var startStep = file.startStep;
		var startStep = ss;
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


		this._isMounted = true;
		this.checkNextMessage();
	},

	checkNextMessage: function(){


		var ray = this.state.messages;

		var nextStep = this._CurrentStep + 1;

		var file = this.getConvoFile(this.props.episode, this.props.convoID);

		if( nextStep < file.conversation.length ) {
			var user = file.conversation[nextStep].user;

			if(user.toUpperCase() == 'PLAYER') {

				console.log("It is the player's turn to respond");

				this.setState({
					isPlayer: true,
					responseUno: file.conversation[nextStep].text,
					responseDeuce: file.conversation[nextStep].text2
				});

			} else {

				console.log("It is the app's turn to respond");

				this.setState({
					isPlayer: false,
					responseUno: '',
					responseDeuce: ''
				});

				this.renderNextMessage(nextStep);

			}

		} 


	},


	renderNextMessage: function(next) {

		var file = this.getConvoFile(this.props.episode, this.props.convoID);
		var obj = file.conversation[next];
		var ray = this.state.messages.slice();
		//console.log(this.state.messages);

		setTimeout(() => {
			this.setState({
				typingMessage: 'Typing a message...',
			});
		}, 400);

		setTimeout(() => {
			this.setState({
				typingMessage: '',
			});
		}, 1200 );

		setTimeout(() => {

			var imgURL = file.conversation[next].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
			let uni = Math.round(Math.random() * 100000);

			ray.push({
				"text" : obj.text , 
				"name" : obj.user , 
				"position" : obj.position , 
				"image" : imgURL , 
				"date" : new Date(2016, 0 ,1, 20, 0), 
				"uniqueId" : uni  
			});

			this.setState({
				messages: ray
			});

		}, Math.random() * (4000 - 2200) + 2200);


		
		this.increaseStep(next);


	},

	handleSend: function( message = {} ){

		var _this = this;
		var file = this.getConvoFile(this.props.episode, this.props.convoID);
		var ray = this.state.messages.slice();
		console.log(ray);

		var nextStep = this._CurrentStep + 1;
		var imgURL = file.conversation[nextStep].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		let uni = Math.round(Math.random() * 100000);


		ray.push({
			"text" : message.text , 
			"name" : message.name , 
			"position" : message.position , 
			"image" : imgURL , 
			"date" : message.date, 
			"uniqueId" : uni  
		});

		this.setState({
			isPlayer: false,
			messages: ray
		});


		
		this.increaseStep(nextStep);

		setTimeout(() => {
			
		}, 1000);


	},

	componentDidUpdate: function(prevProps, prevState) {

		if(prevState.messages !== this.state.messages ){
			//console.log(prevState.messages);
			//console.log(this.state.messages);
			console.log("Things are different");
			if(this._isMounted === true) {
				this.checkNextMessage();
			} else if (this._isMounted !== true){
				var step = this.props.start;
				this.loadStartConvo(step);
			} else {
				
			}
		 	
		}


	},


	increaseStep: function(newStep){

		var _this = this;

		var file = this.getConvoFile(this.props.episode, this.props.convoID);
		if(newStep >= file.conversation.length - 1) {
			console.log("There are no more steps LEFT");
			_this.props.updatestep();
		} else {
			console.log("This is the newStep count " + newStep);
		}

		this._CurrentStep = newStep;
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
				 typingMessage={this.state.typingMessage}
				 disabled={this.state.isPlayer ? false : true}

				 responseOne={this.state.responseUno}
				 responseTwo={this.state.responseDeuce}

			/>
		);
	}


});