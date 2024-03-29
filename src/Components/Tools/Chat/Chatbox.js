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
    this.stage = this.data ? this.data.stage : 'start';  

    // the state will consist of the current conversation object
    this.state = Object.assign(this.conversation[this.stage][this.step], { tick: false });

    this.input = React.createRef();
    this.continue = React.createRef();
    this.continue2 = React.createRef();

    this.otherSpeaker = React.createRef();
    this.selfSpeaker = React.createRef();

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
    if (this.conversation[this.stage][this.step].type === 'end' || this.conversation[this.stage][this.step].type === 'complete') {
      if (this.continue.current) this.continue.current.style.display = 'none'; 
      if (this.continue2.current) this.continue2.current.style.display = 'none'; 
      return;
    }

    // check if we have a transition to deal with
    if (this.conversation[this.stage][this.step].type === 'transition') {
      
      // set the correct stage
      this.stage = this.conversation[this.stage][this.step].goto;

      // reset the steps
      this.step = 0;
    }

    // The below needs to wait for ticking speed, so we set the state here to change the layout and then we perform the actions
    this.setState({ tick: true });


    setTimeout(() => {

      // check if we have an item do deal with
      if (this.conversation[this.stage][this.step].type === 'item') this.props.bubbleItem(this.conversation[this.stage][this.step].item, 'add');
      if (this.conversation[this.stage][this.step].type === 'item-remove') this.props.bubbleItem(this.conversation[this.stage][this.step].item, 'remove');
      if (this.conversation[this.stage][this.step].type === 'item-clear') this.props.bubbleItem(this.conversation[this.stage][this.step].item, 'clear');

      // load next step
      this.setState(Object.assign(this.conversation[this.stage][this.step], { tick: false}));

      if (this.input.current) this.input.current.focus(); 
    }, 750);
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
   * Method to uppercase the name and replace - with spaces to make it look nice
   * @param {*} name 
   */
  convertName = name => {

    let newName = name.charAt(0).toUpperCase() + name.slice(1);
    return newName.replace('-',' ')
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

  /**
   * Method to handle the input entered by the user
   * @param {} event 
   */
  handleSubmit = (event) => {

    // prevent default form behaviour
    event.preventDefault();

    // the code below extracts the entered amount
    let input = this.input.current.value;

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

            { speaker() === "other" ? <img src= {process.env.PUBLIC_URL + `/Gifs/${this.state.speaker}.gif`} ref={this.otherSpeaker} className="chatbox-head chatbox-head-right" alt=""/> : null}

            <div className="chatbox-text-display">
          
              <div className="chatbox-title">{this.convertName(this.state.speaker)}</div>

              <div className="chatbox-text">{this.state.text}</div>

              <div className="chatbox-continue">
                {
                  this.state.tick ? 
                  <span className="chatbox-continue-white">Please wait...</span>
                  :
                  <span ref={this.continue} onClick={this.nextDialogue}>Click here to continue</span>
                }
              </div>
            </div>

            {this.state.speaker === 'guido' ? <img src= {process.env.PUBLIC_URL + '/Gifs/guido.gif'} ref={this.selfSpeaker} className="chatbox-head" alt=""/> : null}

          </div>

        :

        // if it is not a dialogue, we will always use the none display
        <div className="chatbox-none-display">
          
          {/* Within the non display, we have three different options */}

          {/* choice */}
          {this.state.type === "choice" ? 
            <div className="chatbox-choice-display">
            
              <div className="chatbox-title">
                <div className="chatbox-choice-title-grid">
                  <img src= {process.env.PUBLIC_URL + '/Images/sword.png'} className="chatbox-sword" alt=""/>
                  <span className="chatbox-choice-title">Select an option</span>
                  <img src= {process.env.PUBLIC_URL + '/Images/sword.png'} className="chatbox-sword img-hor" alt=""/>
                </div>
              </div>
              
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
                <label className="chatbox-input-label">
                  <strong>Enter amount:</strong>
                  <input className="chatbox-input-input" type="number" ref={this.input} placeholder="*" name="amount" />
                </label>
                <input type="submit" value="Submit" className="chatbox-input-submit"/>
              </form>
            </div>
          
          // default --> item
          : 
            <div className="chatbox-item-display">

              <img src= {process.env.PUBLIC_URL + `/Images/${this.state.item}.png`} className="chatbox-item-image" alt=""/>

              <div className="chatbox-item-layout">

                <div className="chatbox-item-text">{this.state.text}</div>

                <div className="chatbox-continue">
                {
                  this.state.tick ? 
                  <span className="chatbox-continue-white">Please wait...</span>
                  :
                  <span ref={this.continue2} onClick={this.nextDialogue}>Click here to continue</span>
                }
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