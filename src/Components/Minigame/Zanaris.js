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

    /**
     *  There should be a big data object here that holds the entire dialogue and its specs
     *  This will be fed to the Chatbox component. It is contained in a json.
     */
    this.conversation = json;

  }

  /**
   * Method to handle the choice
   * @param {str} choice  The current stage within the dialogue will be given
   */
  handleChoice = (choice) => {

  }

  /**
   * Method to handle an incoming event
   * @param {} event 
   */
  handleEvent = event => {
    if (event === 'end') this.props.onTeleport('puropuro');
  }

  render() {
    
    return (
      
      <div className="quiz"> 

        {/* Load the chat with the conversation */}
        <Chat 
          ref={this.chat} 
          conversation={this.conversation} 
          onEvent={this.handleEvent}
        />

      </div>
    );
  }
}
 
export default Zanaris;