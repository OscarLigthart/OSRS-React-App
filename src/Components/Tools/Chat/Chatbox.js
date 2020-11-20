import React, { Component } from "react";

import './Chatbox.css'


/**
 *  This component will handle all chat
 *  It will receive input in the following structure:
 * 
 *  
 */
class Chatbox extends Component {

  /**
   *  The class to show a conversation
   *  
   *  The conversation is given in the following structure:
   *  
   *  data: [{
   *      type: dialogue | choices
   *      speaker: me | gif
   *      dialogue: the text to be show
   *    }, {
   *      type: dialogue | choices
   *      speaker: me | gif
   *      dialogue: The text to be shown
   *     }]
   * 
   *  Where every array entry will be a step in the conversation
   */

  constructor(props) {

    super();

    this.step = 0;
    this.conversation = props.conversation;

    this.state = this.conversation[this.step];

    // bind methods
    this.nextDialogue = this.nextDialogue.bind(this);
    this.load = this.load.bind(this);

  }

  /**
   *  Method to call the next dialogue option
   */
  nextDialogue = () => {

    // increase step
    this.step += 1;

    // load next step
    this.setState(this.conversation[this.step]);
  }
  
  /**
   * Method to load a new conversation
   * @param { } conversation 
   */
  load = conversation => {

    // reset state and step counter
    this.setState(conversation);
    this.step = 0;
    this.conversation = conversation;
  }

  /**
   *  Method to handle the choice made by the player
   *  It will simply fire the index of the choice to the component
   *  That created the conversation
   */
  handleChoice = (choice) => {
    this.props.bubbleChoice(choice);
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/chatbox.jpg)',
    };

    const speaker = () => {
      switch(this.state.speaker) {

        case "guido":   return 'me';
        case "":        return 'none';
        default:        return 'other'
      }
    }

    return (
      
      <div className="chatbox" style={backgroundStyle}>
        
        {this.state.type === 'dialogue' ?
          <div className={`chatbox-${speaker()}-display`}>

            { speaker() === "other" ? <img src= {process.env.PUBLIC_URL + `/Gifs/${this.state.speaker}.gif`} className="chatbox-head chatbox-head-right" alt=""/> : null}

            <div className="chatbox-text-display">
          
              <div className="chatbox-title">{this.state.speaker}</div>

              <div className="chatbox-text">{this.state.dialogue}</div>

              <div className="chatbox-continue">
                <span onClick={this.nextDialogue}>Click here to continue</span>
              </div>
            </div>

            {this.state.speaker === 'guido' ? <img src= {process.env.PUBLIC_URL + '/Gifs/guido.gif'} className="chatbox-head" alt=""/> : null}

          </div>

        :

        <div className="chatbox-none-display">
          <div className="chatbox-choice-display">
          
          <div className="chatbox-title">Select an option</div>

          <div className="chatbox-choices">
            
            {/* Show the choices! */}
            {this.state.choices.map((value, index) => {
              return <div key={index} className='chatbox-choice' onClick={() => {this.handleChoice(index)}}>{value}</div>
            })}

          </div>

        </div>

        </div>
        }
      </div>
    );
  }
}
 
export default Chatbox;