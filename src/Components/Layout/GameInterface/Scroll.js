import React, { Component } from "react";

import './Scroll.css'

class Scroll extends Component {

  constructor(props) {

    super();

  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/clue_interface.png)',
    };

    return (
      
      <div className="clue-scroll" style={backgroundStyle}>
        
      </div>
    );
  }
}
 
export default Scroll;