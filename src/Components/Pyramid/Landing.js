import React, { Component } from "react";

import Chat from '../Tools/Chat';

var json = require('./landing.json');
/**
 *  This component is responsible for building the quiz
 */
class Landing extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    this.chat = React.createRef();

    // // Checkpoint?
    // this.checkpoint ? this.data = {
    //   stage: 'complete',
    // } : this.data = {
    //   stage: 'start'
    // };

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
    if (event === 'end') this.props.onTeleport('plunder');
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
 
export default Landing;