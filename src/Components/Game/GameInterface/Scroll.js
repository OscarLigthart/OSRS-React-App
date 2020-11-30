import React, { Component } from "react";

import './Scroll.css'

class Scroll extends Component {

  constructor(props) {

    super();

    // which text has to be shown?
    this.stage = props.stage;

    this.clueText = {
      first:  'Travel to the wizard\'s tower to obtain a dramen staff.',
      second: 'Teleport to zanaris and hunt for a next clue.',
      third:  'That which you have not been able to do in the real game, is your assignment for now.'      
    }
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/clue_interface.png)',
    };

    return (
      
      <div className="clue-scroll" style={backgroundStyle}>

        <div className="clue-scroll-text"><p>{this.clueText[this.stage]}</p></div>
        
      </div>
    );
  }
}
 
export default Scroll;