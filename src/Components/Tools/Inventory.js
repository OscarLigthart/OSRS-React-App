import React, { Component } from "react";

import './Inventory.css'
import ItemList from '../Tools/Inventory/ItemList';

class Inventory extends Component {

  constructor(props) {

    super();

    // load the items in the list
    this.state = {
      items : ItemList,
      flash : false
    }

    // create ref for container
    this.container = React.createRef();

    // check if a layout is given. horizontal is default
    this.layout = props ? props.layout ? props.layout : 'horizontal' : 'horizontal';

    // boolean to temporarily stop a user from clicking
    this.stopClick = false;

    // bind methods
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clear = this.clear.bind(this);
    this.stopClicks = this.stopClicks.bind(this);
    this.flash = this.flash.bind(this);
  }

  // Adds the item to the state item array
  addItem = (item, index) => {

    // append the item to the currently shown item list
    // TODO ADD THE FLASH?
    if (ItemList.length < 12) typeof(index) === 'undefined' ? ItemList.push(item) : ItemList.splice(index, 0, item);

    // reload the inventory
    this.setState({
      items: ItemList
    });
  }

  /**
   * Removes a certain item within the inventory
   * 
   * If the index is given, it is not required to give the item
   * If the index is not given, the final item occurence will be removed
   * 
   * @param {} item   item to be removed
   * @param {} index  index to be removed
   */
  removeItem = (item, index) => {


    if (typeof(item) !== 'string') index = item;

    // if index is not given we simply remove the final position
    if (typeof(index) === 'undefined') {

      // get indices of this element
      let indices = ItemList.map((elm, idx) => elm === item ? idx : '').filter(String);

      // only remove if there is something to remove
      if (!indices.length) return;

      // get max index
      index = Math.max.apply(null, indices);
    }

    // splice list
    ItemList.splice(index, 1);

    // Refresh state
    this.setState({
      items: ItemList
    });
  }

  /**
   * Method to clear the inventory of a certain item
   * @param {} item 
   */
  clear = (item) => {

    let filtered = ItemList.filter(function(value, index, arr){ 
      return value !== item;
    });

    // Set length to 0
    ItemList.length = 0;

    // this is pretty weird but we can't overwrite the ItemList, hence this code
    filtered.map(x => ItemList.push(x));

    // Refresh state
    this.setState({
      items: ItemList
    });
  }

  /**
   *  Method to stop the click handling
   */
  stopClicks = () => {

    // stop the clicking
    this.stopClick = true;
  }

  /**
   * Method to handle a click on an Inventory item
   * @param {} value 
   */
  handleClick = (elem, value) => {

    if (this.stopClick) return;

    // bubble the clicking event
    if (this.props.onInventoryClick) this.props.onInventoryClick(value);

    // get index
    let index = Array.from(elem.target.parentNode.parentNode.children).indexOf(elem.target.parentNode); 

    // if an eclectic impling is clicked, it must be turned into another item
    if (value === 'eclectic_impling_jar') {

      // remove this impling
      this.removeItem(index);

      // open the impling
      this.openImpling(index);
    }

    // simply remove the items that are useless on click
    if (['bucket', 'burnt_meat', 'sawdust', 'old_boot'].includes(value)) this.removeItem(index);
  }
  
  /** 
   *  Method to flash the inventory such that the user knows what to do 
   */
  flash = () => {

    this.setState({
      flash: true
    })

    setTimeout(() => {
      this.setState({
        flash: false
      })
    }, 500);
  }

  /** 
   * Method to open an impling
   */
  openImpling = (index) => {

    // get loot 
    let item = this.loot();

    // if it is the clue scroll, let the parent know
    if (item === 'clue_scroll' && this.props.onClueScroll) this.props.onClueScroll('clue_scroll');
    
    // add the item
    this.addItem(item, index);
  }

  /**
   *  Method to open up an impling jar
   */
  loot = () => {

    // let the rng decide the faith
    let rng = Math.floor(Math.random() * 25);

    // return appropriate item
    if (rng < 2) return 'clue_scroll';
    else if (rng < 10) return 'bucket';
    else if (rng < 18) return 'old_boot';
    else return 'burnt_meat';

  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/inventory_flat.png)',
    };

    return (
      
      <div className={`inventory ${this.state.flash ? 'fadeOut':'fadeIn'}`} style={backgroundStyle} ref={this.container}>

        <div className="flash-screen"/>
        <div className={`inventory-grid-${this.layout}`}>

        { this.state.items ? 
        this.state.items.map((value, index) => {
        return <div key={index} onClick={e=>this.handleClick(e, value)}>
        
          <img src= {process.env.PUBLIC_URL + `/Images/${value}.png`} className="inventory-item" alt=""/>
        
        </div>
        
        }) : null}

        </div>
      </div>
    );
  }
}
 
export default Inventory;