import React, { Component } from "react";

import './Quiz.css';
import Dialogue from './Dialogue';

import ChatLayout from '../Tools/ChatLayout';

// Import Chatlayout here

/**
 *  This component is responsible for building the quiz
 */

class Quiz extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

  }

  render() {
    
    return (
      
      <div className="quiz"> 
        
        {/* Import Chatlayout */}
        <ChatLayout widget={Dialogue}/>
        {/* Insert Dialogue widget */}

        {/* <Dialogue/> */}
      </div>
    );
  }
}
 
export default Quiz;