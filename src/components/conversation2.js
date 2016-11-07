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


		this._clist;
		this._conversationID;

		return {
			messages: [],
			typingMessages: '',
			responseUno: 'Response one here',
			responseDeuce: 'Response two here',
			isPlayer: false
		};

	},

	componentWillMount: function(){

		this._clist = this.props.clist;
		this._conversationID = this.props.convoID;

	},


	componentDidMount: function(){

		var check = this.checkEpisode(this._clist, this._conversationID );


	},


	checkEpisode: function(cl, cid){

		console.log("CHECK EPISODE");
		

		cl.map(item => 
			item.id === cid ? (
				console.log("true")
			) :
			( console.log("false") )
		)

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

				// Legacy code from before hacked package //
				senderName= ''
				senderImage={null}
				displayNames={true}
				// ** //


				parseText={true}
				typingMessage={this.state.typingMessage}
				disabled={this.state.isPlayer ? false : true}

				responseOne={this.state.responseUno}
				repsonseTwo={this.state.responseDeuce}

			/>
		);
	}


});

















































