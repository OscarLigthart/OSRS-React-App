import React, { Component } from "react";

import './Chatbox.css'


/**
 *  This component will handle all chat
 */
class Chatbox extends Component {

  /**
   *  The class to show a conversation
   *  
   *  The conversation is given in the following structure:
   *  
   *  data :
   *  {
   *    start: [{
   *      type: the type of chat,
   *      speaker: the speaker
   *      text: the text to show 
   *    },
   *    {
   *      ... 
   *    }]
   * }
   * 
   *  Where every array entry will be a step in the conversation
   * 
   * 
   *  TODO: might be nice to add an extra conversation option after the choice
   */

  constructor(props) {

    super();

    // initialize variables
    this.step = 0;
    this.conversation = props.conversation;
    this.data = props.data;

    // set the conversation stage to start
    this.stage = this.data.stage ? this.data.stage : 'start';  
    
    // DEBUG
    this.stage = 'question10';

    // the state will consist of the current conversation object
    this.state = this.conversation[this.stage][this.step];

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

    // Check if the type is end. If so, let the components know
    this.props.bubbleEvent(this.conversation[this.stage][this.step].type);

    // do not go to the next step if we are at the end
    if (this.conversation[this.stage][this.step].type === 'end' || this.conversation[this.stage][this.step].type === 'complete') return;

    // check if we have a transition to deal with
    if (this.conversation[this.stage][this.step].type === 'transition') {
      
      // set the correct stage
      this.stage = this.conversation[this.stage][this.step].goto;

      // reset the steps
      this.step = 0;
    }

    // load next step
    this.setState(this.conversation[this.stage][this.step]);
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
   * 
   *  @param nextChat the key to the next dialogue object value
   *  @param choice   the string holding the choice made by the player
   */
  handleChoice = (nextChat, choice) => {

    // bubble the nextChat
    this.props.bubbleChoice(nextChat);

    // This code makes the player repeat the answer
    // it will call the nextDialogue method from the newly created chatbox
    this.setState({
      type: 'dialogue',
      speaker: 'guido',
      text: choice
    });

    // set the part of the conversation to the choice
    this.stage = nextChat;

    // reset the step
    this.step = -1;
  }

  handleSubmit = (event) => {

    // prevent default form behaviour
    event.preventDefault();

    // the code below extracts the entered amount
    let input = event.target.children[0].children[0].value;

    // now we need to cross reference this to the actual value;
    if (input === this.state.correct) this.handleChoice(this.state.goto.correct, input);
    else this.handleChoice(this.state.goto.wrong, input); 
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

              <div className="chatbox-text">{this.state.text}</div>

              <div className="chatbox-continue">
                <span onClick={this.nextDialogue}>Click here to continue</span>
              </div>
            </div>

            {this.state.speaker === 'guido' ? <img src= {process.env.PUBLIC_URL + '/Gifs/guido.gif'} className="chatbox-head" alt=""/> : null}

          </div>

        :

        // if it is not a dialogue, we will always use the none display
        <div className="chatbox-none-display">
          
          {/* Within the non display, we have three different options */}

          {/* choice */}
          {this.state.type === "choice" ? 
            <div className="chatbox-choice-display">
            
              <div className="chatbox-title">Select an option</div>
              
              <div className="chatbox-choices">
                
                {/* Show the choices! */}
                {this.state.choices.map((value, index) => {
                  return <div key={index} className='chatbox-choice' onClick={() => {this.handleChoice(value.goto, value.text)}}>{value.text}</div>
                })}

              </div>

            </div>

          // input
          : this.state.type === "input" ? 

            <div className="chatbox-input">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Enter amount:
                  <input type="number" ref={this.input} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
          
          // default --> item
          : 
            <div className="chatbox-item-display">

              <img src= {process.env.PUBLIC_URL + `/Images/${this.state.item}.png`} className="chatbox-item-image" alt=""/>

              <div className="chatbox-item-layout">

                <div className="chatbox-item-text">{this.state.text}</div>

                <div className="chatbox-continue">
                  <span onClick={this.nextDialogue}>Click here to continue</span>
                </div>
                
              </div>
            
            </div>
          
          }

        </div>

        }
      </div>
    );
  }
}
 
export default Chatbox;