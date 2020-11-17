import React, { Component } from "react";

import './Chatbox.css'

class Chatbox extends Component {

  constructor(props) {

    super();

  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/chatbox.jpg)',
    };

    return (
      
      <div className="chatbox" style={backgroundStyle}>
        
        {/* The Left section will consist of a head and the right of the questions */}

        <div className="chatbox-display">

          {/* Here we insert the talking head with all its emotions and stuff */}
          <div className="chatbox-head">
            
          </div>
    

          <div className="chatbox-text">


          </div>
        </div>
      </div>
    );
  }
}
 
export default Chatbox;