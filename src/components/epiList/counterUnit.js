import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	PixelRatio
} from 'react-native';


module.exports = React.createClass({

	render: function(){
		return (
			<View style={this.props.active ? styles.containerActive : styles.containerInactive}>
				<Text>
					{this.props.count}
				</Text>
			</View>
		);
	}

});

var styles = StyleSheet.create({
	containerActive: {
		width: 25,
		height: 25,
		backgroundColor: 'white',
		borderStyle: 'solid',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25 
	},

	containerInactive: {
		width: 25,
		height: 25,
		backgroundColor: 'black',
		borderStyle: 'solid',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25 
	},

	count: {


	}

});