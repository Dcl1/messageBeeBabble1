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

		console.log("That's a mount");
		this.loadEpisode(this._episode, this._conversationID, this._step);

	},

	componentWillUnmount: function(){

		console.log("That is a unmount");

	},


	loadEpisode: function( epi, convo, step ){


		switch(epi) {
			case 1 :
				var file = conversationOne.convo;
				this.grabConvo(file, convo, step);
				return null;
			default :
				console.log("No episode detected");
				return null;
		}

	},

	grabConvo: function( f, c, s){

		var CV = f[c];
		var arr = [];

		for(var i = 0 ; i <= s; i ++) {
			console.log("File " + f +  "Convo ID " + c + "Step " + i);
			var imgURL = CV.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
			let uni = Math.round(Math.random() * 100000);

			arr.push({
				"text" : CV.conversation[i].text,
				"name" : CV.conversation[i].user,
				"position" : CV.conversation[i].position,
				"image" : imgURL,
				"date" : new Date(),
				"uniqueId" : uni
			});

		}

		console.log(arr);

		this.setState({
			messages: arr
		});

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
