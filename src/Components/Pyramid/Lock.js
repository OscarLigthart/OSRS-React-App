import React, { Component } from "react";

import './Lock.css';

/**
 *  This component is responsible for building the quiz
 */
class Lock extends Component {
  /**
   *  Quiz clas
   * @param {*} props 
   */

  constructor(props) {

    super();

    // make reference for lockpick
    this.lockpick = React.createRef();

    // create random list of active pins
    this.activePins = [];
    while(this.activePins.length < 3){
        let r = Math.floor(Math.random() * 5);
        if(this.activePins.indexOf(r) === -1) this.activePins.push(r);
    }

    // list of pins
    this.pins = [];   
    
    this.clicked = false;
  }

  /**
   *  Stop the lockpick and check current position
   */
  handleClick = () => {

    if (this.clicked) return;

    this.clicked = true;

    // stop the lockpick for now
    this.lockpick.current.classList.add("lockpick-stop");

    // check for a hit
    this.checkHit();

    // show animation of going up
    this.lockpick.current.classList.add("lockpick-up");

    // animation timeouts
    setTimeout(()=> {
        if (this.lockpick.current) this.lockpick.current.classList.remove("lockpick-up");
    }, 500);
    setTimeout(()=>{
        if (this.lockpick.current) this.lockpick.current.classList.remove("lockpick-stop");

        this.clicked = false;
    }, 1000);
  }

  /**
   *  Method to check if the lockpick hit an active pin
   */
  checkHit = () => {

    // get x for the lockpick
    let lockpickX = this.lockpick.current.offsetLeft;

    // get all active pin x
    this.pins.forEach((pin, index) => {
        
        // only process active pins
        if (!this.activePins.includes(index)) return;

        // Check if lockpick hit this pin
        let pinX = pin.offsetLeft;

        // Check if pin is in range of lockpick
        if (pinX > (lockpickX - 70) && pinX < (lockpickX - 40)){

            // remove activity of pin
            pin.classList.remove('pin-active');

            // remove pin from active list
            this.activePins.splice(this.activePins.indexOf(index), 1);

            setTimeout(()=> {
                // let parent know if lock has been picked after the transitions have been completed
                if (!this.activePins.length) this.props.onLockPick();
            }, 1000);           
        }

    });


    // check if any got hit and make the animation for that one
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/lock.png)',
      };

    const lockpick = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/lockpick.png)',
    };

    const pin = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/pin.png)',
    }

    return (
      
      <div className="lock" onClick={() => {this.handleClick()}}>  
        <div className="lock-container" style={backgroundStyle}> 

            <div className="lock-pins">
                {
                [...Array(5).keys()].map(index => {
                        return <div key={index} ref={(ref) => this.pins[index] = ref} style={pin} className={`pin ${this.activePins.includes(index) ? 'pin-active': null}`}/>;
                    })
                }
            </div>
        </div>
        <div className="lockpick-slider" ref={this.lockpick}>
            <img 
                src= {process.env.PUBLIC_URL + `/Images/lockpick.png`} 
                className="lockpick"
                alt=""
            />
        </div>
      </div>
    );
  }
}
 
export default Lock;