import React, { Component } from "react";

import './Game.css';
import GameInterface from './GameInterface';
import Inventory from '../Tools/Inventory';

import ItemList from '../Tools/Inventory/ItemList';

/**
 *  This is the gamelayout of the app when playing.
 *  
 */

class Game extends Component {

    constructor(props) {

        super();
    
        // refs
        this.gameInterface = React.createRef();
        this.inventory = React.createRef();

        this.stage = props.stage;
    }

    /**
     * Method used to let the base game know to teleport to a different locations
     *
     * @param {} location 
     */
    teleportHandler = (location) => {
        this.props.onTeleport(location);
    }
    
    /**
     *  Method to handle the inventory calls with
     * @param { } item 
     */
    inventoryHandler = (item) => {

      // ugly exception
      if (item === 'dramen_staff' && this.stage === 'third') return;

      // show the item in the interface
      this.gameInterface.current.show(item);

      // if clicked on sceptre, add a casket
      if (item === 'sceptre' && !ItemList.includes('casket')) this.inventory.current.addItem('casket');
    }
    
    render() {

        const backgroundStyles = {      
          minimap: { backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/kompas.png)' },
          skills: { backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/skills.png)'}
        };
    
    
        return (

        <div className="game">
        
          {/* The left side holds the game interface and the inventory */}
          <div className="game-left">  

            <GameInterface ref={this.gameInterface} onTeleport={this.teleportHandler} stage={this.stage}/>

            <Inventory onInventoryClick={this.inventoryHandler} ref={this.inventory}/>

          </div>

          <div className="game-right">

            <div className="game-minimap" style={backgroundStyles.minimap}>
              <img src= {process.env.PUBLIC_URL + '/Images/minimap.png'} className="game-minimap-overlay" alt=""/>
            </div>

            <div className="game-skills" style={backgroundStyles.skills}>
                
            </div>

          </div>

        </div>

        )
    }
};

export default Game;
