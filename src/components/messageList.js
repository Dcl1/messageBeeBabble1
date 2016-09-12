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


import EpisodeCounter from './epiList/episodeCounter';


module.exports = React.createClass({

	getInitialState: function(){
		var theData = [{"user" : "fred", "id" : 1 ,"text" : "cmon man"}, {"user" : "helio", "id" : 2 ,"text" : "zoom zoom"}];

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

		return {
			dataSource: ds.cloneWithRows(theData)
		};

	},

	componentWillMount: function(){

		console.log("The message list mounted");

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
				/>
			</View>
		);
	},


	_renderSectionHeader: function( sectionData, sectionID){
		console.log("SECTION DATA: " + sectionData + " " + "SECTION ID: " + sectionID);

		return (
			<TouchableHighlight>
				<View>
					<EpisodeCounter />
				</View>
			</TouchableHighlight>
		);
	},

	_renderRow: function(rowData: string, sectionID: number, rowID: number ){
		return (
			<TouchableHighlight style={styles.postCard} onPress={ () => Actions.Conversation } >
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


















