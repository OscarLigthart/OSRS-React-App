import React, { Component } from "react";

import './Base.css';
import Game from './Game/Game';
import Quiz from './Quiz/Quiz';
import Intro from './Intro/Intro';
import Zanaris from './Minigame/Zanaris';
import PuroPuro from './Minigame/PuroPuro';

// Debug for giving items
// import ItemList from './Tools/Inventory/ItemList'

// ItemList.push('dramen_staff', 'clue_scroll', 'scroll_book', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar')

/**
 *  This is the base of the app when playing.
 *  It is also responsible for all communications between the different components.
 *  It acts as a hub and controls all components.
 */
class Base extends Component {
  /**
   *  Layout clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    this.state = {
      show: true,
      state: 'intro',
      teleportAnimation: false,
    }

    this.quizCheckpoint = false;

    this.minigameComplete = false;
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

  quizHandler = () => { this.quizCheckpoint = true };

  scrollHandler = () => {

    // let the world know the minigame has been completed
    this.minigameComplete = true;

    // teleport back
    this.teleportHandler('zanaris')
  }

  render() {
    const state = () => {
      switch(this.state.state) {
        
        case "intro":  return <Intro onTeleport={this.teleportHandler}/>;
        case "game":   return <Game onTeleport={this.teleportHandler}/>;

        case "wizard":   return <Quiz 
          checkpointReached={this.quizCheckpoint} 
          onTeleport={this.teleportHandler} 
          onCheckpoint={this.quizHandler}/>;

        case "zanaris": return <Zanaris onTeleport={this.teleportHandler} checkpointReached={this.minigameComplete}/>

        case "puropuro": return <PuroPuro onClueScroll={this.scrollHandler}/>

        default:      return <h1>No project match</h1>
      }
    }

    return (
      
      <div className="base">

          <div className="black-screen"/>

          {/* Teleport animation */}
          {this.state.teleportAnimation ? <img src= {process.env.PUBLIC_URL + '/Gifs/teleport.gif'} className="teleport-animation" alt=""/> : null }

          {/* Animation */}
          <div className={`show-screen ${this.state.show ? 'fadeIn':'fadeOut'}`}>{state()}</div>        

      </div>
    );
  }
}
 
export default Base;