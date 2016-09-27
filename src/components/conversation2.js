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



module.export = React.createClass({

	getInitialState: function(){


		return {
			isPlayer: false,
			messages: [],
			typingMessages: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here'
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
				 typingMessage={this.state.typingMessage}
				 disabled={this.state.isPlayer ? false : true}

				 responseOne={this.state.responseUno}
				 responseTwo={this.state.responseDeuce}

			/>
		);
	}


});
