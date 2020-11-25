import React, { Component } from "react";

import './Inventory.css'
import ItemList from '../Tools/Inventory/ItemList';

class Inventory extends Component {

  constructor(props) {

    super();

    // load the items in the list
    this.state = {
      items : ItemList
    }

    this.layout = props ? props.layout ? props.layout : 'horizontal' : 'horizontal';

    // bind methods
    this.addItem = this.addItem.bind(this);
  }

  // Adds the item to the state item array
  addItem = item => {

    // append the item to the currently shown item list
    ItemList.push(item);

    // reload the inventory
    this.setState({
      items: ItemList
    });
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/inventory_flat.png)',
    };

    return (
      
      <div className="inventory" style={backgroundStyle}>
        <div className={`inventory-grid-${this.layout}`}>

        { this.state.items ? 
        this.state.items.map((value, index) => {
        return <div key={index} onClick={()=>this.props.onInventoryClick(value)}>
        
          <img src= {process.env.PUBLIC_URL + `/Images/${value}.png`} className="inventory-item" alt=""/>
        
        </div>
        
        }) : null}

        </div>
      </div>
    );
  }
}
 
export default Inventory;