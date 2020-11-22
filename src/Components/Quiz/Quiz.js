import React, { Component } from "react";

import './Quiz.css';

import Chat from '../Tools/Chat';

var json = require('./dialogue.json');

/**
 *  This component is responsible for building the quiz
 */

class Quiz extends Component {
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

    // have we reached the checkpoint yet?
    this.checkpoint = props.checkpointReached;

    this.checkpoint ? this.data = {
      stage: 'back',
    } : this.data = {
      stage: 'start'
    };
  }

  /**
   * Method to handle the choice
   * @param {str} choice  The current stage within the dialogue will be given
   */
  handleChoice = (choice) => {

    // extract the chatbox
    // let chatbox = this.chat.current.chatbox.current;

    // we create a checkpoint at phase 2
    if (choice === 'phase2') {

      // THIS DOESNT WORK, it should refer to the Chat
      this.props.onCheckpoint();
    }
  }

  /**
   * Method to handle an incoming event
   * @param {} event 
   */
  handleEvent = event => {

    // if it is not completed yet, but ended we simply teleport back
    if (event === 'end') this.props.onTeleport('game');

    // if it is completed we may have to handle inventory and scroll book
    else if (event === 'complete') {
      
      // handle the completeness
      
      // teleport
      this.props.onTeleport('game')      
    }
  }

  render() {
    
    return (
      
      <div className="quiz"> 
        
        {/* Import Chatlayout */}
        {/* <Chat widget={Dialogue}/> */}

        {/* Load the chat with the conversation */}
        <Chat ref={this.chat} data={this.data} conversation={this.conversation} onChoice={this.handleChoice} onEvent={this.handleEvent}/>

      </div>
    );
  }
}
 
export default Quiz;