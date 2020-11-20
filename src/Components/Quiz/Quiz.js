import React, { Component } from "react";

import './Quiz.css';
import Dialogue from './Dialogue';

import Chat from '../Tools/Chat';

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
     *  This will be fed to the Chatbox component
     */
    this.conversation = [{
        type:     'dialogue',
        speaker:  '',
        dialogue: 'By a magical force, you instantly arrive at the wizard\'s tower'
      }, {
        type:     'dialogue',
        speaker: 'guido',
        dialogue: 'Wow my head feels a little weird... Where am I?',
      }, {
        type:     'dialogue',
        speaker: 'professor',
        dialogue: "Welcome to the Wizard's tower!\nSinterklaas told me that you might drop by."
      }, {
        type:     'dialogue',
        speaker: 'professor',
        dialogue: 'I heard that you might be looking for a Dramen staff. Luckily for you, I am in possession of such an item.'
      }, {
        type:     'dialogue',
        speaker: 'guido',
        dialogue: 'Great! Could you hand it over?'  
      }, {
        type:     'dialogue',
        speaker: 'professor',
        dialogue: 'Of course! If you would simply be so kind to give me a glass of beer!'
      }, {
        type:     'dialogue',
        speaker: 'guido',
        dialogue: 'Oh really? It\'s that simple?'
      }, {
        type:     'dialogue',
        speaker: 'wizard',
        dialogue: 'Professor will you stop memeing already?'
      }, {
        type:     'dialogue',
        speaker: 'wizard',
        dialogue: 'No my dear boy, Sinterklaas asked us to test your knowledge. If you manage to pass the test, we will hand over the staff!'
      }, {
        type:     'dialogue',
        speaker: 'professor',
        dialogue: 'So, are you ready to take on the knowledge test?'
      }, {
        type:   'choice',
        choices: [
          'Yes of course! This will be a piece of cake.',
          'No fuck you guys! That\'s lame!'
        ]
      }, {
        type: 'dialogue',
        speaker: 'wizard',
        dialogue: 'Very well! Here is my first question:'
      }
    ]

    }

    /**
     * Method to handle the choice
     * @param {} choice 
     */
    handleChoice = (choice) => {

      // extract the chatbox
      let chatbox = this.chat.current.chatbox.current;

      // handle choice IMPROVE THIS
      if (choice == 0) {
        chatbox.nextDialogue();
      }
      else {
        chatbox.load({
          type: 'dialogue',
          speaker: 'professor',
          dialogue: 'Well then, no present for you!'
        })
      }
      // handle the choice here and load the correct data back into the chatbox
    }


  render() {
    
    return (
      
      <div className="quiz"> 
        
        {/* Import Chatlayout */}
        {/* <Chat widget={Dialogue}/> */}

        {/* Load the chat with the conversation */}
        <Chat ref={this.chat} conversation={this.conversation} onChoice={this.handleChoice}/>

      </div>
    );
  }
}
 
export default Quiz;