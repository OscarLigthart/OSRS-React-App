import React, { Component } from "react";

import './Teleport.css'

class Teleport extends Component {

  constructor(props) {

    super();

  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/scroll_book_interface.png)',
    };

    return (
      
      <div className="teleport" style={backgroundStyle}>
        
      </div>
    );
  }
}
 
export default Teleport;