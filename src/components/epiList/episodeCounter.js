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



	render: function(){
		return (
			<View style={styles.container}>
				<CounterUnit count="1" active={true} />
				<CounterUnit count="2" active={false} />
				<CounterUnit count="3" active={false} />
				<CounterUnit count="4" active={false} />
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