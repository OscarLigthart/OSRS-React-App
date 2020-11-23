import React, { Component } from "react";

import './Chat.css';

import Chatbox from './Chat/Chatbox';
import Inventory from '../Tools/Inventory';

/**
 *  This component is responsible for creating the layout when chatting
 *  It only shows the map and the inventory at the top --> I need to point to the inventory
 */

class Chat extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    // the widget to be inserted
    this.widget = props.widget;

    // conversation to be passed to the chatbox
    this.conversation = props.conversation;

    // the subcomponents
    this.chatbox = React.createRef();
    this.inventory = React.createRef();

    // take the data
    this.data = props.data;

  }

  handleChoice = (choice) => {
    if (this.props.onChoice) this.props.onChoice(choice);
  }

  handleEvent = (event) => {
    if (this.props.onEvent) this.props.onEvent(event);
  }

  /**
   * Method to pass an item that is given to the player into the inventory
   * @param {} item 
   */
  handleItem = (item) => {
    this.inventory.current.addItem(item);
  };

  inventoryHandler = (event) => {
    this.props.onItem(event);
  };


  // We will pass al arguments through here to the chatbox, and that will deal with the hard stuff
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
                <Inventory ref={this.inventory}  onInventoryClick={this.inventoryHandler}/>
            </div>

            <div className="chat-layout-minimap" style={backgroundStyles.minimap}>
                <img src= {process.env.PUBLIC_URL + '/Images/minimap.png'} className="chat-layout-minimap-overlay" alt=""/>
            </div>

        </div>

        {/* DO WE INSERT THE WIDGET? OR DO WE CREATE CHATBOX AND WORK WITH THAT */}

        {/* There's always going to be the Chatbox here right, so create it here */}
        <Chatbox 
          ref={this.chatbox} 
          conversation={this.conversation} 
          data={this.data} 
          bubbleChoice={this.handleChoice} 
          bubbleEvent={this.handleEvent}
          bubbleItem={this.handleItem}
        />

        {/* Pass the widget that will control the chatbox 

            MIGHT NEED THIS LATER FOR FULL CONTROL OF CHATBOX
        
        */}
        {/* {this.state.loaded ? <this.widget chatbox={this.chatbox.current}/> : null } */}
        
      </div>
    );
  }
}
 
export default Chat;