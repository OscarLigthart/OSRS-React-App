import React, { Component } from "react";

import './Base.css';
import Game from './Game/Game';
import Quiz from './Quiz/Quiz';
import Intro from './Intro/Intro';
import Zanaris from './Minigame/Zanaris';
import PuroPuro from './Minigame/PuroPuro';
import Pyramid from './Pyramid/Pyramid';
import Plunder from './Pyramid/Plunder';

// Debug for giving items
// import ItemList from './Tools/Inventory/ItemList'

// ItemList.push('sceptre')
// ItemList.push('dramen_staff', 'clue_scroll', 'scroll_book')//, 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar', 'eclectic_impling_jar')


/**
 *  TODO LIST:  (order of relevance)
 * 
 *    Debug --> DO 5 RUNS of different things
 *    
 */

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
      state: 'intro', // default is intro
      stage: 'first',
      teleportAnimation: false,
    }

    // milestones
    this.quizCheckpoint = false;
    this.minigameComplete = false;
    this.plunderComplete = false;
  }

  // handler for teleport commands, will switch screens
  teleportHandler = (location) => {

    switch(location){
      case 'wizard': this.setState({
        stage:  'second',
        show:   false
      });
      break;

      case 'zanaris': this.setState({
        stage:  'third',
        show:   false
      });
      break;

      case 'pyramid': this.setState({
        stage:  'fourth',
        show:   false
      });
      break;

      default: this.setState({show: false});
    }
    
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
    this.teleportHandler('zanaris');
  }

  sceptreHandler = () => {

      // let the world know the pluner has been completed
      this.plunderComplete = true;

      // teleport back
      this.teleportHandler('pyramid');
  }

  render() {
    const state = () => {
      switch(this.state.state) {
        
        case "intro":  return <Intro onTeleport={this.teleportHandler}/>;
        case "game":   return <Game onTeleport={this.teleportHandler} stage={this.state.stage}/>;

        case "wizard":   return <Quiz 
          checkpointReached={this.quizCheckpoint} 
          onTeleport={this.teleportHandler} 
          onCheckpoint={this.quizHandler}
        />;

        case "zanaris": return <Zanaris onTeleport={this.teleportHandler} checkpointReached={this.minigameComplete} stage={this.state.stage}/>

        case "puropuro": return <PuroPuro onClueScroll={this.scrollHandler}/>

        case "pyramid": return <Pyramid onTeleport={this.teleportHandler} checkpointReached={this.plunderComplete}/>

        case "plunder": return <Plunder onSceptre={this.sceptreHandler} chest={Math.floor(Math.random() * Math.floor(12))}/>

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