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
        <div className="teleport-grid">
          <div className="teleport-wizard" onClick={() => this.props.onTeleportClick('wizard')}>
            <span className="teleport-title">Wizard's tower</span>
            <img src= {process.env.PUBLIC_URL + '/Images/wizardhat.png'} className="teleport-wizardhat" alt=""/>
            <span className="teleport-amount">1</span>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Teleport;