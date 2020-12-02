import React, { Component } from "react";

import './Start.css';


/**
 *  The main component of this App, that will be responsible for loading all subsequent
 *  components. 
 * 
 *  This app is build for a mobile phone held sideways. It will instruct the user to keep
 *  it sideways if the user fails to do so
 */
class Start extends Component {

  constructor(props) {
    super();

  }

  render(){
  return (
    <div className="start">

        <div className="gedicht-section">
            {/* Will consist of gedicht and button to continue */}
            <p>Sint en piet zaten te denken</p>
            <p>Wat ze Guido nou eens zouden moeten schenken</p>
            <p>Was het nou dit?</p>
            <p>Of was het nou dat?</p>
        </div>

        <div className="gedicht-section">
            {/* Will consist of gedicht and button to continue */}
            <p>Sint en piet zaten te denken</p>
            <p>Wat ze Guido nou eens zouden moeten schenken</p>
            <p>Was het nou dit?</p>
            <p>Of was het nou dat?</p>
        </div>

        <div className="gedicht-section">
            {/* Will consist of gedicht and button to continue */}
            <p>Sint en piet zaten te denken</p>
            <p>Wat ze Guido nou eens zouden moeten schenken</p>
            <p>Was het nou dit?</p>
            <p>Of was het nou dat?</p>
        </div>

        <div className="gedicht-section">
            {/* Will consist of gedicht and button to continue */}
            <p>Sint en piet zaten te denken</p>
            <p>Wat ze Guido nou eens zouden moeten schenken</p>
            <p>Was het nou dit?</p>
            <p>Of was het nou dat?</p>
        </div>

        <div className="gedicht-section">
            {/* Will consist of gedicht and button to continue */}
            <p>Sint en piet zaten te denken</p>
            <p>Wat ze Guido nou eens zouden moeten schenken</p>
            <p>Was het nou dit?</p>
            <p>Of was het nou dat?</p>
        </div>

        <button className="start-button" onClick={() => {this.props.onStart()}}>Start surprise!</button>

    </div>
  );
  }
}

export default Start;
