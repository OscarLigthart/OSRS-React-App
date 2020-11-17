import React, { Component } from "react";

import './Inventory.css'

class Inventory extends Component {

  constructor(props) {

    super();

  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/inventory_flat.png)',
    };

    return (
      
      <div className="inventory" style={backgroundStyle}>
        <div className="inventory-grid">
        
        <div onClick={() => this.props.onInventoryClick('book')}>
            <img src= {process.env.PUBLIC_URL + '/Images/scroll_book.png'} className="inventory-item" alt=""/>
        </div>

        <div onClick={() => this.props.onInventoryClick('scroll')}>
            <img src= {process.env.PUBLIC_URL + '/Images/clue_scroll.png'} className="inventory-item" alt=""/>
        </div>


        </div>
      </div>
    );
  }
}
 
export default Inventory;