import React, { Component } from "react";

import Chat from '../Tools/Chat';

var json = require('./zanaris.json');
/**
 *  This component is responsible for building the quiz
 */

class Zanaris extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    this.chat = React.createRef();

    // have we reached the checkpoint yet?
    this.checkpoint = props.checkpointReached;
    
    this.checkpoint ? this.data = {
      stage: 'complete',
    } : this.data = {
      stage: 'start'
    };

    this.stage = props.stage;

    /**
     *  There should be a big data object here that holds the entire dialogue and its specs
     *  This will be fed to the Chatbox component. It is contained in a json.
     */
    this.conversation = json;
  }

  /**
   * Method to handle an incoming event
   * @param {} event 
   */
  handleEvent = event => {
    if (event === 'end') this.props.onTeleport(this.checkpoint ? 'game' : 'puropuro');
  }

  render() {
    
    return (
      
      <div className="quiz"> 

        {/* Load the chat with the conversation */}
        <Chat 
          ref={this.chat} 
          data={this.data}
          conversation={this.conversation} 
          onEvent={this.handleEvent}
        />

      </div>
    );
  }
}
 
export default Zanaris;