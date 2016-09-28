import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	ListView,
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

		return {
			dataSource: ds.cloneWithRows(theData)
		};

	},

	componentWillMount: function(){

		console.log("Something should be happening");

		this._episode = this.props.epidsode;

	},

	componentDidMount: function(){

		console.log("component did mount");

		this.loadData(this._episode);
	},

	loadData: function(epi){

		var _this = this;
		//this.props.updatemessagelist.bind(null, "Hen", "Only text", "true", 0);
		//this.props.updatemessagelist("Hen", "Only text", "true", 1, 1);
		console.log("load Data");
		if( epi === 1 ) {
			console.log("inside if statement");
			epiOneMsgList.msgList[0].messages.map(function(obj){
				_this.props.updatemessagelist(obj.user, obj.text, obj.completed, obj.cid, obj.start);
			});
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

	checkData: function(epi){


		
		var _this = this;
		var arr =[];

		if(epi === 1) {
			epiOneMsgList.msgList[0].messages.map(function(obj){
				arr.push({"user" : obj.user, "id" : obj.cid, "text" : obj.text})
			});
			var vs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
			_this.setState({
				dataSource: vs.cloneWithRows(arr)
			});

		} else if (epi === 2) {

			epiTwoMsgList.msgList[0].messages.map(function(obj){
				arr.push({"user" : obj.user, "id" : obj.cid, "text" : obj.text})
			});

			var vs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
			_this.setState({
				dataSource: vs.cloneWithRows(arr)
			});


		} else {
			//console.log("Cannot load message list");
		}


	},

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
				<View>
					<Text> {rowData.user} </Text>
					<Text> {rowData.text} </Text>
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

	postCard: {
		flex: 1,
		flexDirection: 'column',
		padding: 15,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderBottomColor: 'grey'
	}

});


















