import React, { Component } from "react";

import './Teleport.css';

import ItemList from '../../Tools/Inventory/ItemList';


class Teleport extends Component {

  constructor(props) {

    super();

    this.teleportAmounts = {
      wizard: ItemList.includes('dramen_staff') ? 0 : 1
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
        </div>
      </div>
    );
  }
}
 
export default Teleport;