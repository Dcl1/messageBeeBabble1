'use strict';

import React, {Component} from 'react';

import Conversation from '../components/conversation3';


import * as AppActions from '../actions/appActions';
import * as MessageActions from '../actions/messageActions';
import * as ConversationActions from '../actions/conversationActions';

import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';




class ConvoContainer extends Component {

	constructor(props) {
		super(props);
	}

	// componentWillReceiveProps(nextProps){
	// 	//console.log("That's an update : " + nextProps.cid);
	// 	if(nextProps.cid !== this.props.cid) {
	// 		//console.log("This is definitely a different convo");
	// 	}
	// }

	componentDidUpdate(prevProps, prevState){


	}


	render(){

		const { state, actions } = this.props;
		var cID = this.props.cid;
		var ste = this.props.start;
		var epi = this.props.epi;
		var idList;


		function hasValue(obj, key , value){
			return obj.hasOwnProperty(key) && obj[key] === value;
		}

		var InList = state.conversationList.clist.some(function(convo){
			return hasValue(convo, "convoid", cID);
		})


		if (InList){
			state.conversationList.clist.map(function(convo, index){
				if(state.conversationList.clist[index].convoid === cID ){
					idList = state.conversationList.clist[index].convo;
				}
			});
		} else {
			idList = [];
		}


		return (
			<Conversation
				episode={1}
				convoID={cID}
				ste={ste}
				clist={idList}
				{...actions}
			/>
		);
	}

}


export default connect(state => ({
		state: state
	}),
	(dispatch) => ({
		actions: bindActionCreators(Object.assign({}, AppActions, MessageActions, ConversationActions), dispatch)
	})
)(ConvoContainer);














