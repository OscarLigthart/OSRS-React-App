import React, { Component } from "react";

import Chat from '../Tools/Chat';
import './Pyramid.css';

var json = require('./pyramid.json');
/**
 *  This component is responsible for building the quiz
 */
class Pyramid extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    // ref to chat
    this.chat = React.createRef();

    // have we reached the checkpoint yet?
    this.checkpoint = props.checkpointReached;

    this.checkpoint ? this.data = {
      stage: 'complete',
    } : this.data = {
      stage: 'start'
    };

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

    if (event === 'end') this.props.onTeleport(this.checkpoint ? 'game' : 'plunder');
  }

  render() {
    
    return (
      
      <div className="pyramid"> 

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
 
export default Pyramid;