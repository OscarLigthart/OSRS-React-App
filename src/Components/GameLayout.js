import React, { Component } from "react";

import './GameLayout.css';
import Inventory from './GameLayout/Inventory';
import GameInterface from './GameLayout/GameInterface';

/**
 *  This is the gamelayout of the app when playing.
 *  
 */

class GameLayout extends Component {

    constructor(props) {

        super();
    
        this.gameInterface = React.createRef();
    
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

        <div className="game-layout">
        
          {/* The left side holds the game interface and the inventory */}
          <div className="game-layout-left">  

            <GameInterface ref={this.gameInterface} onTeleport={this.teleportHandler}/>

            <Inventory onInventoryClick={this.inventoryHandler}/>

          </div>

          <div className="game-layout-right">

            <div className="game-layout-minimap" style={backgroundStyles.minimap}>
              <img src= {process.env.PUBLIC_URL + '/Images/minimap.png'} className="game-layout-minimap-overlay" alt=""/>
            </div>

            <div className="game-layout-skills" style={backgroundStyles.skills}>
                
            </div>

          </div>

        </div>

        )
    }
};

export default GameLayout;
