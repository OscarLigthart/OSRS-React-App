import React, { Component } from "react";

import './FairyRing.css'

class FairyRing extends Component {

  constructor(props) {

    super();

    this.state = {
        teleport: true
    }

    // The rings
    this.firstring = {
        rings: [],
        stopClick: false,
        letters: ['a','b','c','d'],
        current: 1
    };
    this.secondring = {
        rings: [],
        stopClick: false,
        letters: ['i','j','k','l'],
        current: 1
    };
    this.thirdring = {
        rings: [],
        stopClick: false,
        letters: ['p','q','r','s'],
        current: 1
    };
  }

  /**
   * Turn a certain ring clockwise
   * @param {} ring 
   */
  turn = (ring) => {

    // do not stack click events
    if (ring.stopClick) return;
    ring.stopClick = true;

    // add one to the current
    ring.current = ring.current === 0 ? 3 : ring.current - 1;

    // retrieve the coordinates of the first one?
    ring.rings.forEach(elem => {
        elem.classList.remove('pause');
    });

    // Quarter rotation == 2.5 seconds
    setTimeout(() => {
    
        ring.rings.forEach(elem => {
            elem.classList.add('pause');
        });

        ring.stopClick = false;
    }, 1495);
  }

  /**
   *  Handles the teleport
   */
  handleTeleport = () => {

    // check configuration
    if (this.firstring.letters[this.firstring.current] === 'b' &&
        this.secondring.letters[this.secondring.current] === 'k' &&
        this.thirdring.letters[this.thirdring.current] === 's'){
        this.props.onTeleport('zanaris')
    }

    else {
        this.setState({teleport: false});

        let runCount = 0;
        
        let timerId = setInterval(() => {
            runCount++;
            if(runCount > 2) clearInterval(timerId);
        
            // flip state
            this.setState({teleport: !this.state.teleport});
        }, 500);
    }
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/fairytext.png)',
    };

    return (
    
    <div className="fairy">
        <div className="fairy-title" style={backgroundStyle}>Budget Fairy Rings</div>
        <div className="fairy-ring">
            
            <div className="fairy-ring-cycle" onClick={() => {this.turn(this.firstring)}}>

                {
                    [...Array(4).keys()].map(index => {
                        return <div key={index} className="fairy-ring-letter pause" ref={(ref) => this.firstring.rings[index] = ref}><div className="letter">{this.firstring.letters[index]}</div></div>;
                    })

                }

                <div className="ring-overlay left"></div>
            </div>

            <div className="fairy-ring-cycle" onClick={() => {this.turn(this.secondring)}}>

                {
                    [...Array(4).keys()].map(index => {
                        return <div key={index} className="fairy-ring-letter pause" ref={(ref) => this.secondring.rings[index] = ref}><div className="letter">{this.secondring.letters[index]}</div></div>;
                    })

                }

                <div className="ring-overlay"></div>
            </div>

            <div className="fairy-ring-cycle" onClick={() => {this.turn(this.thirdring)}}>

                {
                    [...Array(4).keys()].map(index => {
                        return <div key={index} className="fairy-ring-letter pause" ref={(ref) => this.thirdring.rings[index] = ref}><div className="letter">{this.thirdring.letters[index]}</div></div>;
                    })

                }

                <div className="ring-overlay right"></div>            
            </div>
        </div>
        <div className="fairy-teleport" onClick={this.handleTeleport} style={backgroundStyle}>
            {!this.state.teleport ? <span className="wrong-teleport">X</span> : <span/>}
            <span>Teleport</span>
            {!this.state.teleport ? <span className="wrong-teleport">X</span> : <span/>}
        </div>
      </div>
    );
  }
}
 
export default FairyRing;