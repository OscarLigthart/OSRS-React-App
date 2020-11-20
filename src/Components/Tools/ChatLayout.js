import React, { Component } from "react";

import './ChatLayout.css';

import Inventory from './Inventory';
import Chatbox from './Chatbox';

/**
 *  This component is responsible for creating the layout when chatting
 *  It only shows the map and the inventory at the top --> I need to point to the inventory
 */

class ChatLayout extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    // extract the given widget
    this.widget = props.widget;
  }

//   We will pass al arguments through here to the chatbox, and that will deal with the hard stuff

  render() {

    const backgroundStyles = {      
        minimap: { backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/kompas.png)' },
        skills: { backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/skills.png)'}
      };
  
    
    return (

      <div className="chat-layout"> 

        <div className="chat-layout-upper">
            {/* Inventory and minimap */}

            <div className="chat-layout-inventory">
                <Inventory onInventoryClick={this.inventoryHandler}/>
            </div>

            <div className="chat-layout-minimap" style={backgroundStyles.minimap}>
                <img src= {process.env.PUBLIC_URL + '/Images/minimap.png'} className="chat-layout-minimap-overlay" alt=""/>
            </div>

        </div>

        {/* DO WE INSERT THE WIDGET? OR DO WE CREATE CHATBOX AND WORK WITH THAT */}

        {/* There's always going to be the Chatbox here right, so create it here */}
        <Chatbox/>
        
      </div>
    );
  }
}
 
export default ChatLayout;