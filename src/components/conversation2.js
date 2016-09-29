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


		this._step;
		this._conversationID;
		this._episode;


		this._file;

		return {
			isPlayer: false,
			messages: [],
			typingMessages: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here'
		};

	},

	componentWillMount: function(){

		this._step = this.props.start;
		this._conversationID = this.props.convoID;
		this._episode = this.props.episode;

		

	},

	componentDidMount: function(){

		this.loadEpisode(this._episode, this._conversationID, this._step);		

	},

	componentWillUnmount: function(){


	},


	loadEpisode: function( epi, convo, step ){


		switch(epi) {
			case 1 :
				var file = conversationOne.convo[convo];
				this._file = file;
				this.grabConvo(file , step);
				console.log("STEP ONE");
				return null;
			default :
				return null;
		}

	},

	grabConvo: function( f, s){

	
		var arr = [];

		for(var i = 0 ; i <= s; i ++) {
			//console.log("File " + f +  "Convo ID " + c + "Step " + i);
			var imgURL = f.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
			let uni = Math.round(Math.random() * 100000);

			arr.push({
				"text" : f.conversation[i].text,
				"name" : f.conversation[i].user,
				"position" : f.conversation[i].position,
				"image" : imgURL,
				"date" : new Date(),
				"uniqueId" : uni
			});

		}

		this.setState({
			messages: arr
		});

	},

	componentWillReceiveProps: function(nextProps) {

		if(nextProps.convoID !== this.props.convoID) {
			Actions.pop();
		}

	},

	// componentWillUpdate: function( nextProps, nextState){

	// 	var ray = this.state.messages;
	// 	console.log("CWU Ray's length " + ray.length);

	// 	if(nextState.messages !== this.state.messages ){
	// 		var now = nextState.messages;
	// 		var past = this.state.messages;
	// 		console.log("STEP TWO " + now);
	// 		console.log(past);

	// 		this.setState({
	// 			messages: nextState.messages
	// 		});
	// 		//console.log( now + " " + past);
	// 		//console.log("Calling checkNextMessage");
	// 		//console.log("This step " + this._step);
	// 		this.checkNextMessage(this._step);

	// 	} else {
	// 		console.log(this.state.messages);
	// 	}
	// },


	componentDidUpdate: function(prevProps, prevState){

		var ray = this.state.messages;
		console.log("CDU Ray's length " + ray.length);

		if(prevState.messages !== this.state.messages ) {

			var now = this.state.messages;

			console.log(now);
			this.checkNextMessage(this._step);

		}


	},


	checkNextMessage: function(ste){

		var _this = this;
		var nextStep = this._step + 1;
		var file = this._file;

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

				//console.log("It is the app's turn to respond");
				var test = this.state.messages;
				console.log(test);
				console.log("STEP THREE " + _this.state.messages);

				this.setState({
					isPlayer: false,
					responseUno: '',
					responseDeuce: ''
				});

				this.renderNextMessage(nextStep);

			}

		} 



	},


	increaseStep: function(newStep){

		var _this = this;
		var file = this._file;
		if(newStep >= file.conversation.length - 1) {
			_this.props.updatestep();
		} else {
			//console.log("This is the newStep count " + newStep);
		}

		this._step = newStep;

	},


	renderNextMessage: function(next){

		var file = this._file;
		var obje = file.conversation[next];

		var ray = this.addMessages(obje);
		console.log("STEP FIVE");
		console.log(ray);


	},


	addMessages: function(obj){

		var stat = this.state;
		console.log(stat.messages);
		var imgURL = obj.position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		let uni = Math.round(Math.random() * 100000);
		console.log("STEP FOUR");
		return [
			...stat.messages,
			{
				"text" : obj.text,
				"name" : obj.user,
				"position" : obj.position,
				"image" : imgURL,
				"date" : new Date(2016, 0 ,1, 20, 0), 
				"uniqueId" : uni
			}
		]


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
