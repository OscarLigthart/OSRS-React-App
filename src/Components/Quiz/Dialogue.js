import { Component } from "react";

import './Dialogue.css';


// Here we should import the chatbox

/**
 *  This component is responsible for building the quiz
 */

class Dialogue extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    this.chatbox = props.chatbox;

    /**
     *  There should be a big data object here that holds the entire dialogue and its specs
     *  This will be fed to the Chatbox component
     */
    this.conversation = [{
      speaker: '',
      dialogue: 'By a magical force, you instantly arrive at the wizard\'s tower'
      
    }, {
      speaker: 'guido',
      dialogue: 'This is a test dialogue',
    }, {
      speaker: 'professor',
      dialogue: "Welcome to the Wizard's tower!"
    }, {

    }, {

    }]
  }



  // We don't render anything here
  render() {
    
    return (
      null
    );
  }
}
 
export default Dialogue;