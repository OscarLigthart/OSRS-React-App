import React, { Component } from "react";

import './PuroPuro.css';

import Inventory from '../Tools/Inventory';

/**
 *  This component is responsible for building the quiz
 */

class PuroPuro extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    // ref for item
    this.inventory = React.createRef();

    this.imps = [];
    this.flashes = [];

    this.visibleImp = -1;

    this.registerClick = false;
    this.running = false;
  }

  // the engine of the minigame
  engine = () => {

    // engine must only run once
    if (this.running) return;
    this.running = true;

    // create reference to this
    let self = this;

    function spawner() {

        // show a random impling
        self.showImpling(Math.floor(Math.random() * (11 - 0 + 1) + 0))

        // set timer for next imp
        setTimeout(spawner, 2000 + Math.random() * 2000);
      }
      
    setTimeout(spawner, 2000);
  }

  showImpling = (imp) => {

    // safety check
    if (imp > 11) return;

    // determine whether to show text or imp
    let appear = Math.random() > 0.4 ? this.imps[imp] : this.flashes[imp];
    
    // safety check
    if (!appear) return;

    // get correct imp and 
    appear.style.display = 'block';

    function disappear() {
        appear.style.display = 'none';
    }

    // register the click
    this.registerClick = true;

    setTimeout(disappear, 700); // 400 as default
  }

  // Method to catch an imp
  catchImp = (imp) => {
    
    // make sure only 1 click counts
    if (!this.registerClick) return;
    this.registerClick = false;

    // check if this imp is visible, then add 
    if (this.imps[imp].style.display === 'block') this.inventory.current.addItem('eclectic_impling_jar');

    // otherwise lose an imp
    else if (this.flashes[imp].style.display === 'block') this.inventory.current.removeItem('eclectic_impling_jar');

    else return;
  }

  /**
   *  Method to handle an incoming scroll
   */
  handleScroll = () => {

    // stop the clicks since we will be teleported out of here
    this.inventory.current.stopClicks();

    // Teleport back to zanaris but this time we want to have different dialogue
    setTimeout(() => { this.props.onClueScroll('zanaris'); }, 500);
  }

  render() {

    // Run the engine
    this.engine();
    
    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/puropurobackground.png)',
    };

    return (
      
        // do we create a new interface?
      <div className="puro-puro"> 
        <div className="puro-puro-maze" style={backgroundStyle}>

            {/* Create 12 cells */}
            {
                [...Array(12).keys()].map(index => {
                    return <div key={index} className="puro-puro-cell" onClick={() => {this.catchImp(index)}}>
                        
                        {/* The background? */}
                        <div className="puro-puro-imp-hole"></div>


                        {/* The impling */}
                        <img 
                            ref={(ref) => this.imps[index] = ref}
                            src= {process.env.PUBLIC_URL + `/Images/eclectic_impling.png`} 
                            className="puro-puro-imp"
                            alt=""
                        />
                    

                        {/* The flash */}
                        <div className="puro-puro-imp-text" ref={(ref) => this.flashes[index] = ref}>Tee hee!</div>

                    </div>;
                })
            }

        </div>

        <Inventory ref={this.inventory} layout='vertical' onClueScroll={this.handleScroll}/>
      </div>
    );
  }
}
 
export default PuroPuro;