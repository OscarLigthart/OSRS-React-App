import React, { Component } from "react";

import './GameInterface.css';
import Teleport from './GameInterface/Teleport';
import Scroll from './GameInterface/Scroll';

class GameInterface extends Component {

  constructor(props) {

    super();

    this.state = {
      show: 'nothing'
    }
  }

  show = (item) => {
  
    item === this.state.show ? this.setState({show: 'nothing'}) : this.setState({show: item});
  }

  teleportHandler = (location) => {
    this.props.onTeleport(location);
  }

  render() {

    const backgroundStyle = {
        backgroundImage: 'url(' + process.env.PUBLIC_URL + '/Images/world.png)',
    };

    return (
      
      <div className="game" style={backgroundStyle}>
        <div className="game-interface">
          {(() => {
            switch (this.state.show) {
              case 'book':
                return <Teleport onTeleportClick={this.teleportHandler}/>;
              case 'scroll':
                return <Scroll/>;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  }
}
 
export default GameInterface;