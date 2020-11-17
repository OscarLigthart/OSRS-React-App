import React, { Component } from "react";

import './Layout.css';
import Inventory from './Layout/Inventory';
import GameInterface from './Layout/GameInterface';

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

    this.gameInterface = React.createRef();

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
      
      <div className="layout">

        <div className="layout-left">  

          <GameInterface ref={this.gameInterface}/>

          <Inventory onInventoryClick={this.inventoryHandler}/>

        </div>

        <div className="layout-right">

          <div className="layout-minimap" style={backgroundStyles.minimap}>
            <img src= {process.env.PUBLIC_URL + '/Images/minimap.png'} className="layout-minimap-overlay" alt=""/>
          </div>

          <div className="layout-skills" style={backgroundStyles.skills}>
              
          </div>

        </div>

      </div>
    );
  }
}
 
export default Layout;