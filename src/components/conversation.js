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
		this._switchCheck;
		this._continue;
		this._messageCheck;

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
		this._continue = this.props.conti;

	},


	componentDidMount: function(){
		this.loadEpisode(this._episode, this._conversationID, this._step);
	},


	loadEpisode: function( epi, convo, step){

		switch(epi){
			case 1 :
				var file = conversationOne.convo[convo];
				this._file = file;
				this.grabConvo(file , step);
				this._switchCheck = file.switchCheck;
				this._messageCheck = file.messageCheck;
				return null;
			default : 
				return null;
		}

	},

	grabConvo: function( f , s){

		var _this = this;	
		var arr = [];

		for(var i = 0 ; i <= s; i ++) {
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

			if( i === s ) {
				_this.props.updatecontinue(_this._conversationID, f.conversation[i].option );
				//_this.addtomessagelist("bill", "billy kid", true, 34523423, 0 );
			}

		}

		this.setState({
			messages: arr
		});

	},

	componentWillReceiveProps: function( nextProps ){

		if(nextProps.convoID !== this.props.convoID) {
			Actions.pop();
		}

		if( nextProps.conti !== this.props.conti ){
			this._continue = this.props.conti
		}

	},

	componentDidUpdate: function( prevProps, prevState ) {

		var _this = this;

		if(prevState.messages !== this.state.messages ) {

			console.log(prevProps);
			console.log(_this.props);

			console.log("The messages did change");

			if(_this._continue == true) {
				console.log("yes calling switch");
				_this.isSwitch(_this._step);
			} else {
				console.log("not calling switch");
				console.log("continue " + _this._continue);
			}
			
		} else if (prevProps.conti !== _this.props.conti && _this.props.conti == true){
			console.log("convo.js componentDidUpdate continue check changed");
			_this.isSwitch(_this._step);
		} else {

			console.log("Component Did Update but not catching on the logic")
		}

	},


	messageCheckActions: function(type) {

		var _this = this;

		switch(type) {
			case 'continue':
				return function(id) {
					return _this.props.updatecontinue(id, true);
				}
			default:
				return null;
		}
	},


	componentWillUpdate: function(nextProps, nextState){

		var msgArr = this._messageCheck;
		var _this = this;

		if(nextState.messages !== this.state.messages ) {
			msgArr.map(function(obj){
				if( obj.step === _this._step ){

					var msgCheckFunc = _this.messageCheckActions(obj.type);
					console.log(msgCheckFunc);
					msgCheckFunc(obj.callid);
				}
			});
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


		} else {
			_this.setState({
				isPlayer: false
			});
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









































