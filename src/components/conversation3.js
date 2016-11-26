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
		this._step;
		this._ste;

		this._switchCheck;

		return {
			messages: [],
			typingMessages: '',
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


		console.log("Component Did Mount");
		this.loadEpisode(this._episode, this._conversationID, this._ste);

	},


	loadEpisode: function(epi, convo, step) {

		var _this = this;
		console.log("Load Episode");


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

		console.log("grab convo called " + s + " ");

		var _this = this;

		for( var i = 0 ; i <= s ; i ++ ) {
			var imgURL = f.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null;
			let uni = Math.round(Math.random() * 100000);

			let user = f.conversation[i].user;
			let position = f.conversation[i].position;
			let text = f.conversation[i].text;

			console.log("grab convo called, for loop");

			_this.props.addconvomessage( this._conversationID , uni , user , position , text );

		}


	},


	render: function(){
		return (
			<View />
		);
	}



});






























