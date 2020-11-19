import React, { Component } from "react";

import './Layout.css';
import Game from './Game';
import Quiz from './Quiz';

/**
 *  This is the layout of the app when playing.
 *  It is also responsible for all communications between the different components.
 *  It acts as a hub and controls all components.
 */

class Layout extends Component {
  /**
   *  Layout clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    this.state = {
      show: true,
      state: 'game',
      teleportAnimation: false,
    }

  }

  // handler for teleport commands, will switch screens
  teleportHandler = (location) => {
    
    // 3 time outs, but first create animation
    this.setState({show: false});
    
    setTimeout(()=> {

      this.setState({
        state: location,
        teleportAnimation: true
      })
    }, 1500);

    setTimeout(() => {

      this.setState({
        teleportAnimation: false,
        show: true
      })
    }, 3000);

  }

  inventoryHandler = (item) => {
    this.gameInterface.current.show(item);
  }

  render() {
    const state = () => {
      switch(this.state.state) {

        case "game":   return <Game onTeleport={this.teleportHandler}/>;
        case "wizard":   return <Quiz />;


        default:      return <h1>No project match</h1>
      }
    }

    return (
      
      <div className="layout">

          <div className="black-screen"/>

          {/* Teleport animation */}
          {this.state.teleportAnimation ? <img src= {process.env.PUBLIC_URL + '/Gifs/teleport.gif'} className="teleport-animation" alt=""/> : null }

          {/* Animation */}
          <div className={`show-screen ${this.state.show ? 'fadeIn':'fadeOut'}`}>{state()}</div>        

      </div>
    );
  }
}
 
export default Layout;