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

		this._clist = this.props.clist;
		this._conversationID = this.props.convoID;
		this._episode = this.props.episode;
		this._step = this.props.start;
	},


	componentDidMount: function(){

		var check = this.checkEpisode(this._clist, this._conversationID );
		

		if(check) {
			console.log("true")
			this.continueConvo(this._episode , this._conversationID , this._step );
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




	continueConvo: function(epi, convo, step){

		var _this = this;

		switch(epi) {
			case 1 :
				var file = conversationOne.convo[convo];
				this._file = file;
				this._switchCheck = file.switchCheck;
				return null;

			default :
				return null;
		}


	},


	componentWillReceiveProps: function( nextProps ){

		if(nextProps.convoID !== this.props.convoID){
			Actions.pop();
		}

	},








	componentDidUpdate: function( prevProps , prevState ) {

		if( prevState.messages !== this.state.messages && prevProps.episode === this.props.episode ) {
			this.isSwitch(this._step);
			console.log("its true!!!");
		} else {
			console.log("its NOT true");
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


	isSwitch: function(ste) {

		var _this = this;

		var arr = _this._switchCheck;

		if( arr.includes(ste + 1) === true ) {
			_this.checkNextMessage(ste);
		} else {
			_this.checkForceMessage(ste, _this.state.lastChoice);
		}


	},


	checkForceMessage: function(){
		console.log("This is a check force message");
	},


	checkNextMessage: function( ste ) {

		var _this = this;
		var nextStep = ste + 1;
		var file = this._file;

		if( nextStep < file.conversation.length ) {

			var user = file.conversation[nextStep].user;
			if (user.toUpperCase() == 'PLAYER') {

				_this.setState({
					isPlayer: true,
					responseUno: file.conversation[nextStep].text,
					responseDeuce: file.conversation[nextStep].text2
				});

			} else {

				_this.setState({
					isPlayer: false,
					resposneUno: '',
					responseDeuce: ''
				});

				_this.renderNextMessage(nextStep);

			}

		} 


	},


	renderNextMesssage: function(next){

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


	addMessages: function(obj){

		var _this = this;
		var stat = this.state;
		var imgURL = obj.position == 'left' ? {uri: 'https://facebook.github.io/react/img/logo_og.png'} : null; 
		let uni = Math.round(Math.random() * 100000);
		//var newStep = this._step + 1;
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
		//this.increaseStep(nextStep);

		this.setState({
			messages: ray
		});

	},


	componentWillUnmount: function(){

		console.log("Component Will Unmount");

		var _this = this;
		var clist = this._clist;
		var cid = this._conversationID;

		var check = this.checkEpisode(clist, this._conversationID);

		if(check) {
			//true
		} else {
			//false
			_this.props.updateconversationlist(_this._conversationID, _this.state.messages );
		}


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
				responseTwo={this.state.responseDeuce}

			/>
		);
	}


});

















































