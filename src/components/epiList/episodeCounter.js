import React from 'react';

import {
	View,
	StyleSheet,
	Text,
	TouchableHightlight,
	PixelRatio
} from 'react-native';

import CounterUnit from './counterUnit';


module.exports = React.createClass({

	getInitialState: function(){

		return {
			episode: 1
		}

	},


	renderUnits: function(){

		var arr = [];
		var _this = this;

		for ( i = 0 ; i < 5; i ++) {
			if( i + 1 <= _this.state.episode ){
				arr.push(<CounterUnit key={i} count={i + 1} active={true} />)
			} else {
				arr.push(<CounterUnit key={i} count={i + 1} active={false} />)
			}
		}

		return arr;
	},


	render: function(){
		return (
			<View style={styles.container}>
				{this.renderUnits()}
				<View>
					<Text>
					{this.props.count}
					</Text>
				</View>
			</View>
		);
	}


});


var styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'aliceblue',
		borderStyle: 'solid',
		borderBottomWidth: 4,
		borderBottomColor: 'black',
		marginTop: 0
	}

});