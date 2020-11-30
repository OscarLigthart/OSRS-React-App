import React, { Component } from "react";

import './Plunder.css';

import Inventory from '../Tools/Inventory';
import Lock from './Lock';

import ItemList from '../Tools/Inventory/ItemList';

/**
 *  This component is responsible for building the quiz
 */

class Plunder extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    // inventory ref
    this.inventory = React.createRef();

    // intialize state
    this.state = {
      chest: false,
      number: null
    }

    // array of the chests
    this.activeChests = [...Array(12).keys()];

    // choose a victory chest
    // this.chosenChest = props.chest;
    this.chosenChest = 2;

    this.clickAllowed = true;
  }

  /**
   *  Method to start the pickpocket minigame
   */
  pickChest = chest => {

    if (!this.clickAllowed) return;

    if (ItemList.length > 11) {

      this.inventory.current.flash();
      return;
    }

    // change state to ini
    this.setState({
      chest: true,
      number: chest
    });
  }

  /**
   *  Method to open the chest
   */
  openChest = chest => {

    // remove the chest
    this.activeChests.splice(this.activeChests.indexOf(chest), 1);

    // remove lockpick
    this.setState({ chest: false});

    // give item
    if (chest === this.chosenChest) {
      
      // do not allow another click
      this.clickAllowed = false;

      // add the sceptre
      this.inventory.current.addItem('sceptre');

      // short timeout until we teleport back
      setTimeout(()=>{
        this.props.onSceptre();
      }, 1000);
    }
    else this.inventory.current.addItem('sawdust');


  }

  render() {
    
    const backgroundStyle = {
      backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/plunder_background.png)',
    };

    return (
      
      // do we create a new interface?
      <div className="pyramid-plunder"> 
        <div className="pyramid-plunder-game" style={backgroundStyle}>
            <div className="pyramid-plunder-grid">

            {/* Create 12 cells */}
              {
                [...Array(12).keys()].map(index => {

                  if (this.activeChests.includes(index)){
                    return <div key={index} className="pyramid-plunder-cell" onClick={() => {this.pickChest(index)}}>

                      <img 
                        src= {process.env.PUBLIC_URL + `/Images/gold_chest.png`} 
                        className="pyramid-plunder-chest"
                        alt=""
                      />

                    </div>;
                  }
                  else return <div key={index}/>;
                })
            }
          </div>

          {/* Container for the lock picking game */}
          {this.state.chest ? 
            <div className="pyramid-plunder-lock">
              <Lock onLockPick={() => {this.openChest(this.state.number)}}/>
            </div>
          :
          null}
        </div>

        <Inventory ref={this.inventory} layout='vertical' onClueScroll={this.handleScroll}/>
      </div>
    );
  }
}
 
export default Plunder;