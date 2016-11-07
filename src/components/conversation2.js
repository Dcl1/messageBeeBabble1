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
		this._episode;
		this._file;
		this._step;

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
		this._episode = this.props.episode;
		this._step = this.props.start;
	},


	componentDidMount: function(){

		var check = this.checkEpisode(this._clist, this._conversationID );
		

		if(check) {
			console.log("true")
		} else {
			this.loadEpisode( this._episode , this._conversationID , this._step );
		}

	},



	checkEpisode: function(cl, cid){

		console.log("CHECK EPISODE");
		console.log(cl);
		console.log(cid);
		var _this = this;

		cl.map(function(item){
			console.log(item);
			console.log(item.id);
			if(item.id === cid){
				return true
			} else {
				return false
			}
		});
		// 	item.id === cid ? return true; : return false;
			

	},

	loadEpisode: function( epi, convo, step){

		var _this = this;
		console.log("Load Episode, The step is " + step);

		switch(epi){
			case 1 :
				var file = conversationOne.convo[convo];
				this._file = file;
				this.grabConvo(file , step);
				this._switchCheck = file.switchCheck;
				return null;

			default : 
				return null;
		}

	},


	grabConvo: function( f , s ) {

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
		}


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

















































