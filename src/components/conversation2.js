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

	componentWillUpdate: function( nextProps, nextState){
		if(nextState.messages !== this.state.messages){
			var now = nextState.messages;
			var past = this.state.messages;
			//console.log( now + " " + past);

			//console.log("This step " + this._step);
			this.checkNextMessage(this._step);

		}
	},


	checkNextMessage: function(ste){

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

		var _this = this;
		var file = this._file;
		var obj = file.conversation[next];
		var ray= [];		
		var nextStep = next;
		//console.log(this.state.messages);

		// setTimeout(() => {
		// 	this.setState({
		// 		typingMessage: 'Typing a message...',
		// 	});
		// }, 400);

		// setTimeout(() => {
		// 	this.setState({
		// 		typingMessage: '',
		// 	});
		// }, 1200 );

		//setTimeout(() => {

		// 	var imgURL = file.conversation[next].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		// 	let uni = Math.round(Math.random() * 100000);

		// 	ray.push({
		// 		"text" : obj.text , 
		// 		"name" : obj.user , 
		// 		"position" : obj.position , 
		// 		"image" : imgURL , 
		// 		"date" : new Date(2016, 0 ,1, 20, 0), 
		// 		"uniqueId" : uni  
		// 	});

		// 	this.setState({
		// 		messages: ray
		// 	});

		// }, Math.random() * (4000 - 2200) + 2200);

		// setTimeout(() => {

		// 	var imgURL = file.conversation[next].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		// 	let uni = Math.round(Math.random() * 100000);

		// 	ray.push({
		// 		"text" : obj.text , 
		// 		"name" : obj.user , 
		// 		"position" : obj.position , 
		// 		"image" : imgURL , 
		// 		"date" : new Date(2016, 0 ,1, 20, 0), 
		// 		"uniqueId" : uni  
		// 	});
		// }, Math.random() * (4000 - 2200) + 2200);

		var p1 = new Promise(

			function(resolve, reject) {

					ray = _this.state.messages.slice();
					console.log("Inside the promise " + ray);
					resolve(ray);
					if(ray !== null){
						resolve(ray);
					}

			}

		);

		setTimeout(() => {
		p1.then(
			function(){

				console.log("Inside then ");

				

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


				


				_this.setState({
					messages: ray
				});
				_this.increaseStep(nextStep);
			}

		).catch(
			function(reason) {
				console.log(reason);
		});
		}, 4000);

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
