import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	ListView,
	Image,
	TouchableHighlight
} from 'react-native';

// Actions for switching screens
import { Actions } from 'react-native-router-flux';
// End of Actions for switching screens


import epiOneMsgList from '../data/epOne/messageList.json';
import epiTwoMsgList from '../data/epTwo/messageList.json';

import EpisodeCounter from './epiList/episodeCounter';
import CounterContainer from '../containers/counterContainer';


module.exports = React.createClass({

	getInitialState: function(){
		var theData = [];

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
		this._episode;
		this._actionlist;

		return {
			dataSource: ds.cloneWithRows(theData)
		};

	},

	componentWillMount: function(){

		this._episode = this.props.episode;

	},

	componentDidMount: function(){


		this.loadData(this._episode, this.props.appStep);
	},

	loadData: function(epi, step){

		var _this = this;
		//this.props.updatemessagelist.bind(null, "Hen", "Only text", "true", 0);
		//this.props.updatemessagelist("Hen", "Only text", "true", 1, 1);

		if( epi === 1 && step === 1  ) {
			_this._actionlist =	epiOneMsgList.msgList[0].actionCheck;

			epiOneMsgList.msgList[0].messages.map(function(obj){

				if(obj.active === true){
					_this.props.updatemessagelist(obj.user, obj.text, obj.active, obj.cid, obj.start);
				}	
				
				
			});
			console.log("How many times is this called");
			this.props.updatestep();

		} else {
			console.log("Set up the other episodes for message list");
		}

	},

	componentWillUpdate: function(nextProps, nextState){

	 	var _this = this;
	 	var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});


		if(nextProps.list !== this.props.list){
			var array = nextProps.list;
			_this.setState({
				dataSource: ds.cloneWithRows(array)
			});
		} else {
		}


	 },


	 componentDidUpdate: function( prevProps, prevState){

	 	var _this = this;
	 	var stp = this.props.appStep;
	 	console.log(stp);

	 	var arr = this._actionlist;

	 	// if(prevProps.appStep !== _this.props.appStep){
	 	// 	console.log("Is this the problem");
	 	// } else {
		 // 	arr.map(function(obj){
		 // 		console.log(obj.step === stp);
		 // 		console.log("obj step " + obj.step);
		 // 		_this.callCheckActions(obj.id, obj.type);
		 // 	});
	 	// }




	 },


	 callCheckActions: function(id , typ){

	 	var _this = this;

	 	switch(typ) {
	 		case "addMore":

	 			console.log("Add More is being called");

	 			_this.props.updatemessageactive(id, true);
	 			_this.props.updatestep();
	 			break;
	 		default:
	 			console.log("action doesn't exist");
	 	}


	 },



	// checkData: function(epi){


		
	// 	var _this = this;
	// 	var arr =[];

	// 	if(epi === 1) {
	// 		epiOneMsgList.msgList[0].messages.map(function(obj){
	// 			arr.push({"user" : obj.user, "id" : obj.cid, "text" : obj.text}, "step" : obj.start)
	// 		});
	// 		var vs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
	// 		_this.setState({
	// 			dataSource: vs.cloneWithRows(arr)
	// 		});

	// 	} else if (epi === 2) {

	// 		epiTwoMsgList.msgList[0].messages.map(function(obj){
	// 			arr.push({"user" : obj.user, "id" : obj.cid, "text" : obj.text})
	// 		});

	// 		var vs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
	// 		_this.setState({
	// 			dataSource: vs.cloneWithRows(arr)
	// 		});


	// 	} else {
	// 		//console.log("Cannot load message list");
	// 	}


	// },

	render: function(){
		return (
			<View style={styles.container}>
				<ListView
					style={styles.msgList}
					automaticallyAdjustContentInsets={false}
					dataSource={this.state.dataSource}
					renderRow= {this._renderRow}
					renderSectionHeader={this._renderSectionHeader}
					enableEmptySections = {true}
				/>
			</View>
		);
	},


	_renderSectionHeader: function( sectionData, sectionID){
		//console.log("SECTION DATA: " + sectionData + " " + "SECTION ID: " + sectionID);

		return (
			<TouchableHighlight>
				<View>
					<CounterContainer />
				</View>
			</TouchableHighlight>
		);
	},

	_renderRow: function(rowData: string, sectionID: number, rowID: number ){
		return (
			<TouchableHighlight style={styles.postCard} onPress={ () => Actions.Conversation({cid: rowData.id, start: rowData.start}) } >
			<View style={styles.rowElement}>
				<View style={styles.col}>
					<Text ellipsizeMode={'middle'} numberOfLines={2}> {rowData.user} </Text>
					<Text ellipsizeMode={'middle'} numberOfLines={2}> {rowData.text} </Text>
				</View>
				<View >
					<Image
						source={require('image!rightChevron')}
					/>
				</View>	
			</View>
			</TouchableHighlight>
		);
	}


});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},

	msgList: {
		marginTop: 66
	},

	col: {
		flex: 1,
		flexDirection: 'column'
	},

	rowElement: {
		flex: 1,
		flexDirection: 'row',
	},

	chevron: {
		alignSelf: 'flex-end',
		justifyContent: 'center'
	},

	postCard: {
		flex: 1,
		flexDirection: 'row',
		padding: 30,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: 'grey'
	}

});


















