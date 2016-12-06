import React from 'react';
import{
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

		this._switchCheck;

		return {
			messages: [],
			typingMessage: '',
			responseUno: '',
			responseDeuce: '',
			isPlayer: false,
			lastChoice: 1
		};
	},

	componentWillMount: function(){
		this._conversationID = this.props.convoID;
		this._episode = this.props.episode;
		this._step = this.props.ste;
	},

	componentDidMount: function(){
		this.loadEpisode(this._episode, this._conversationID, this._step);
	},

	loadEpisode: function(epi, cid, step){
		console.log(epi + " " + cid + " " + step);

		var _this = this;

		switch(epi) {
			case 1 :
				var file = conversationOne.convo[cid];
				console.log(file);
				this._switchCheck = file.switchCheck;

			default:
				return null;
		}
	},

	grabConvo: function( f , s){

		var _this = this;

		for( var i = 0 ; i <= s ; i++ ){
			var imgURL = f.conversation[i].position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null;
			let uni = Math.round(Math.random() * 1000000);
			let user = f.conversation[i].user;
			let position = f.conversation[i].position;
			let text = f.conversation[i].text;

			let stepID = parseInt(this._episode + "" + f.convoID + "" + f.conversation[i].step);
			_this.props.addconvomessage( this._conversationID , uni , user , position , text , imgURL, stepID );
		} 


	},

	componentWillReceiveProps: function( nextProps ) {
		if( nextProps.convoID !== this.props.convoID ){
			Actions.pop();
		}
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

				senderName=''
				senderImage={null}
				displayName={true}

				parseText={true}
				typingMessage={this.state.typingMessage}
				disabled={this.state.isPlayer ? false : true}

				responseOne={this.state.responseUno}
				responseTwo={this.state.responseDeuce}
			/>
		);
	}


});























































