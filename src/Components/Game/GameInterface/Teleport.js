import React, { Component } from "react";

import './Teleport.css';

import ItemList from '../../Tools/Inventory/ItemList';


class Teleport extends Component {

  constructor(props) {

    super();

    this.teleportAmounts = {
      wizard: ItemList.includes('dramen_staff') ? 0 : 1,
      pyramid: props.pyramid
    }
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/scroll_book_interface.png)',
    };

    return (
      
      <div className="teleport" style={backgroundStyle}>
        <div className="teleport-grid">
          <div className="teleport-wizard" onClick={() => {if (this.teleportAmounts.wizard) this.props.onTeleportClick('wizard')}}>
            <span className="teleport-title">Wizard's tower</span>
            <img src= {process.env.PUBLIC_URL + '/Images/wizardhat.png'} className="teleport-wizardhat" alt=""/>
            <span className={`teleport-amount ${this.teleportAmounts.wizard ? null : 'negative'}`}>{this.teleportAmounts.wizard}</span>
          </div>
          <div className="teleport-pyramid" onClick={() => {if (this.teleportAmounts.pyramid) this.props.onTeleportClick('pyramid')}}>
            <span className="teleport-title">Pyramid</span>
            <img src= {process.env.PUBLIC_URL + '/Images/pyramid.png'} className="teleport-pyramid-image" alt=""/>
            <span className={`teleport-amount ${this.teleportAmounts.pyramid ? null : 'negative'}`}>{this.teleportAmounts.pyramid}</span>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Teleport;