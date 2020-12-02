import React, { Component } from "react";

import './GameInterface.css';
import Teleport from './GameInterface/Teleport';
import Scroll from './GameInterface/Scroll';
import FairyRing from './GameInterface/FairyRing';

class GameInterface extends Component {

  constructor(props) {

    super();

    this.stage = props.stage;

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
      
      <div className="game-interface" style={backgroundStyle}>
        <div className="game-interface-box">
          {(() => {
            switch (this.state.show) {
              case 'scroll_book':
                return <Teleport onTeleportClick={this.teleportHandler} pyramid={this.stage === 'third' ? 1 : 0}/>;
              case 'clue_scroll':
                return <Scroll stage={this.stage}/>;
              case 'dramen_staff':
                return <FairyRing onTeleport={this.teleportHandler}/>
              case 'casket':
                return <Scroll stage={'final'}/>;
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