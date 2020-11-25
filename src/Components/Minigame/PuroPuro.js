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


  }

  render() {
    
    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/puropurobackground.png)',
    };


    const eclecticImp = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/eclectic_impling.png)',
    };
  

    return (
      
        // do we create a new interface?
      <div className="puro-puro"> 
        <div className="puro-puro-maze" style={backgroundStyle}>

            {/* Create 12 cells */}
            {
                [...Array(12).keys()].map(index => {
                    return <div key={index} className="puro-puro-cell">
                        
                        {/* The background? */}
                        <div className="puro-puro-imp-hole"></div>


                        {/* The impling */}
                        <img src= {process.env.PUBLIC_URL + `/Images/eclectic_impling.png`} className="puro-puro-imp" alt=""/>
                    

                        {/* The flash */}
                        <div className="puro-puro-imp-text">Tee hee!</div>

                    </div>;
                })
            }

        </div>

        <Inventory ref={this.inventory} layout='vertical'/>
      </div>
    );
  }
}
 
export default PuroPuro;