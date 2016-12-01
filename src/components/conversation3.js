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

		this._conversationID;
		this._episode;
		this._file;
		this._ste;

		this._switchCheck;

		return {
			messages: [],
			typingMessage: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here',
			isPlayer: false,
			lastChoice: 1,
		};

	},


	componentWillMount: function(){
		
		this._conversationID = this.props.convoID;
		this._episode = this.props.episode;
		this._ste = this.props.ste;
		


	},


	componentDidMount: function(){

		this.loadEpisode(this._episode, this._conversationID, this._ste);
		
		console.log(this.props.clist);

		this.setState({
			messages: this.props.clist
		});

	},


	loadEpisode: function(epi, convo, step) {

		var _this = this;


		switch(epi) {
			case 1 :
				var file = conversationOne.convo[convo];
				this._file = file;

				this.grabConvo(file, step);
				this._switchCheck = file.switchCheck;

			default:
				return null;
		}

	},


	grabConvo: function( f , s) {

		var _this = this;

		for( var i = 0 ; i <= s ; i ++ ) {
			var imgURL = f.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null;
			let uni = Math.round(Math.random() * 1000000);

			let user = f.conversation[i].user;
			let position = f.conversation[i].position;
			let text = f.conversation[i].text;

			let stepID = parseInt(this._episode + "" + f.convoID + "" + f.conversation[i].step);

			_this.props.addconvomessage( this._conversationID , uni , user , position , text , imgURL, stepID );

		}


	},


	componentWillReceiveProps: function( nextProps ){

		var _this = this;

		if( nextProps.clist !== this.props.clist && nextProps.convoID == this.props.convoID) {
			//console.log(nextProps.clist);
			_this.setState({
				messages: nextProps.clist
			});
			console.log(nextProps.clist);
			console.log("Component Will Receive Props & call is switch");


			_this.isSwitch(this._ste);
		}


		if( nextProps.convoID !== this.props.convoID ) {
			Actions.pop();
		}

	},


	increaseStep: function(newStep){

		var _this = this;
		var file = this._file;

		if( newStep >= file.conversation.length - 1 ) {
			_this.props.updatestep();
		} 

		this._ste = newStep;

	},


	isSwitch: function(ste) {

		var _this = this;
		var arr = _this._switchCheck;
		console.log("ste " + ste);

		if( arr.includes(ste + 1 ) === true ) {
			_this.checkNextMessage(ste);
		} else {
			_this.checkForceMessage(ste, _this.state.lastChoice);
		}

	},


	checkForceMessage: function( ste , last ) {

		var _this = this;
		var nextStep = ste + 1;
		var file = this._file;

		if( nextStep < file.conversation.length ) {

			var user = file.conversation[nextStep].user;

			if( user.toUpperCase() === 'PLAYER' ) {
				_this.setState({
					isPlayer: true
				});

				if( last === 1 ) {
					_this.setState({
						responseUno: file.conversation[nextStep].text,
						responseDeuce: ''
					});
				} else if ( last == 2 ) {
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
					responseUno: '',
					responseDeuce: ''
				});

				_this.renderNextMessage(nextStep);

			}


		}

	},


	checkNextMessage: function( ste ) {

		var _this = this;
		var nextStep = ste + 1;
		var file = this._file;

		if( nextStep < file.conversation.length ) {

			var user = file.conversation[nextStep].user;

			if(user.toUpperCase() === 'PLAYER' ) {

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


	renderNextMessage: function(next) {

		var _this = this;
		var f = this._file;
		//var obje = f.covnersation[next];

		console.log("Render Next Message Called");

		//var ray = this.addMessages(obje);

		setTimeout(() => {
			this.setState({
				typingMessage: 'Typing a message...',
			});
		}, 400);

		setTimeout(() => {
			this.increaseStep(next);

			this.setState({
				typingMessage: ''
			});

		}, 800);

		setTimeout(() => {

			var imgURL = f.conversation[next].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null;
			let uni = Math.round(Math.random() * 1000000);
			let user = f.conversation[next].user;
			let position = f.conversation[next].position;
			let text = f.conversation[next].text;
			let stepID = parseInt(this._episode + "" + f.convoID + "" + f.conversation[next].step);

			_this.props.addconvomessage( this._conversationID , uni , user , position , text , imgURL, stepID );

		}, Math.random() * (4000 - 2200) + 2200);


	},


	render: function(){
		return (
			<GiftedMessenger

				ref={(c) => this._GiftedMessenger = c}
				style={{
					marginTop: 66 + STATUS_BAR_HEIGHT
				}}

				autoFocus={false}
				messages={this.state.messages}

				handleSend={this.handleSend}

				// Legacy code from before hacked package //
				senderName=''
				senderIamge={null}
				displayName={true}
				// ** //

				parseText={true}
				typingMessage={this.state.typingMessage}
				disabled={this.state.isPlayer ? false : true}

				responseOne={this.state.responseUno}
				responseTwo={this.state.responseDeuce}

			/>
		);
	}



});






























