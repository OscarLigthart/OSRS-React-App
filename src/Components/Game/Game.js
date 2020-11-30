import React, { Component } from "react";

import './Game.css';
import GameInterface from './GameInterface';
import Inventory from '../Tools/Inventory';

/**
 *  This is the gamelayout of the app when playing.
 *  
 */

class Game extends Component {

    constructor(props) {

        super();
    
        this.gameInterface = React.createRef();

        this.stage = props.stage;
    }

    teleportHandler = (location) => {
        this.props.onTeleport(location);
    }
    
    inventoryHandler = (item) => {
        this.gameInterface.current.show(item);
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

            <Inventory onInventoryClick={this.inventoryHandler}/>

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
