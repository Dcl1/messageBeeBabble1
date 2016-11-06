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
import conversationTwo from '../data/epTwo/conversation.json';

module.exports = React.createClass({

	getInitialState: function(){

		this._step;
		this._conversationID;
		this._episode;
		this._file;
		this._switchCheck;

		return {
			isPlayer: false,
			messages: [],
			typingMessages: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here',
			lastChoice: 1,
			switchStep: false

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


	loadEpisode: function( epi, convo, step){

		var _this = this;

		switch(epi){
			case 1 :
				var file = conversationOne.convo[convo];
				this._file = file;
				this.grabConvo(file , step);
				this._switchCheck = file.switchCheck;
				return null;
			case 2:
				console.log("Load Episode 2 ");
				var file =  conversationTwo.convo[convo];
				console.log(file);
				var sttep = 0;
				console.log("sttep " + sttep);
				this._file = file;
				//this.grabConvo(file, sttep);

				for(var i = 0; i <= sttep; i++ ) {
					var imgURL = file.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
					let uni = Math.round(Math.random() * 100000);

					var obj = {
						"text" : file.conversation[i].text,
						"user" : file.conversation[i].user,
						"position" : file.conversation[i].position,
						"image" : imgURL,
						"date" : new Date(),
						"uniqueId" : uni				
					}

					_this.addMessages(file.conversation[i]);
				}
				this._switchCheck = file.switchCheck;
				return null;
			default : 
				return null;
		}

	},

	grabConvo: function( f , s){


		console.log("Grab convo called " + f);
		console.log(f);
	
		var arr = [];

		for(var i = 0 ; i <= s; i ++) {
			console.log("i " + i);
			console.log("s " + s);
			console.log(f.conversation[i]);
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

	componentWillReceiveProps: function( nextProps ){

		if(nextProps.convoID !== this.props.convoID) {
			Actions.pop();
		}

	},

	componentDidUpdate: function( prevProps, prevState ) {

		if(prevState.messages !== this.state.messages) {
			this.isSwitch(this._step);
		}


		if(prevProps.episode !== this.props.episode) {
			this._step = this.props.start;
			this._conversationID = this.props.convoID;
			this._episode = this.props.episode;
			this.loadEpisode(this._episode, this._conversationID, this._step);

		}


	},


	callBack: function(){
		return this._switchCheck.find(_this.findInArray) === undefined;
	},


	isSwitch: function(ste){

		var _this = this;

		var arr = _this._switchCheck;

		if(arr.includes(ste+1) === true){
			_this.checkNextMessage(ste);
		} else {
			_this.checkForceMessage(ste, _this.state.lastChoice);
		}


	},


	checkForceMessage: function( ste , last ){

		var _this = this;
		var nextStep = ste + 1;
		var file = this._file;


		if( nextStep < file.conversation.length ) {

			var user = file.conversation[nextStep].user;
			if( user.toUpperCase() === 'PLAYER' ){

				this.setState({
					isPlayer: true
				});


				if( last === 1 ) {
					_this.setState({
						responseUno: file.conversation[nextStep].text,
						responseDeuce: ''
					});
				} else if ( last === 2 ) { 
					_this.setState({
						responseUno: '',
						responseDeuce: file.conversation[nextStep].text2
					});
				} else {
					_this.setState({
						responseUno: '',
						responseDeuce: ''
					});

					_this.renderNextMessage(nextStep);
				}


			} else {

				this.setState({
					isPlayer: false,
					responseUno: '',
					responseDeuce: ''
				});


				this.renderNextMessage(nextStep, last);

			}

		}

	},


	checkNextMessage: function( ste ){

		var _this = this;
		var nextStep = ste + 1;
		var file = this._file;

		if( nextStep < file.conversation.length ) {

			var user = file.conversation[nextStep].user;
			if(user.toUpperCase() == 'PLAYER') {


				_this.setState({
					isPlayer: true,
					responseUno: file.conversation[nextStep].text,
					responseDeuce: file.conversation[nextStep].text2
				});


			} else {


				_this.setState({
					isPlayer: false,
					responseUno: '',
					responseDeuce: ''
				});

				_this.renderNextMessage(nextStep);


			}


		}

	},

	addMessages: function(obj){

		var _this = this;
		var stat = this.state;
		var imgURL = obj.position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		let uni = Math.round(Math.random() * 100000);
		var newStep = this._step + 1;
		var text;
		var user = obj.user;


		if(user.toUpperCase() !== 'PLAYER' ) {
			if(this.state.lastChoice === 2) {
				var text = obj.text2;
				// _this.setState({
				// 	lastChoice: 1
				// });
			} else {
				var text = obj.text;

			}
		} else {
			var text = obj.text
		}


		this.props.updatemessagestep(this._conversationID, newStep, obj.text);

		return [
			...stat.messages,
			{
				"text" : text,
				"name" : obj.user,
				"position" : obj.position,
				"image" : imgURL,
				"date" : new Date(2016, 0 ,1, 20, 0), 
				"uniqueId" : uni
			}
		]


	},






	handleSend: function( message = {} ) {

		var _this = this;
		var file = this._file;
		var nextStep = this._step + 1;

		this.setState({
			lastChoice: message.choice
		});

		var ray = this.addMessages(message);
		this.increaseStep(nextStep);

		this.setState({
			messages: ray
		});
	},





	increaseStep: function(newStep){

		var _this = this;
		var file = this._file;
		if(newStep >= file.conversation.length - 1) {
			_this.props.updatestep();
		} else {

		}

		this._step = newStep;

	},

	renderNextMessage: function(next){

		var file = this._file;
		var obje = file.conversation[next];

		var ray = this.addMessages(obje);

		setTimeout(() => {
			this.setState({
				typingMessage: 'Typing a message...',
			});
		}, 400);

		setTimeout(() => {
			this.increaseStep(next);

			this.setState({
				typingMessage: '',
			});
		}, 1200 );


		setTimeout(() => {
			this.setState({
				messages: ray
			});

			
		},  Math.random() * (4000 - 2200) + 2200);


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

				 senderName= 'PLAYER'
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









































