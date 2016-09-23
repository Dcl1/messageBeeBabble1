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

		var file = this.getConvoFile(this.props.episode, this.props.convoID);
		console.log(file.conversation);
		this.setState({
			messages: file.conversation
		});

	},

	componentWillReceiveProps: function(nextProps) {



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