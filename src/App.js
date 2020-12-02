import React, { Component } from "react";

import './App.css';
import './styles.css';

import Base from "./Components/Base";
import Start from "./Start";

/**
 *  The main component of this App, that will be responsible for loading all subsequent
 *  components. 
 * 
 *  This app is build for a mobile phone held sideways. It will instruct the user to keep
 *  it sideways if the user fails to do so
 */
class App extends Component {

  constructor(props) {
    super();

    // initialize this components state
    this.state = {
        layoutMode: this.getLayoutMode(),
        start: false
    };

    // create resize handler
    this.onResize = this.onResize.bind(this);

    // container ref
    this.gameContainer = React.createRef();
  }

  // add listeners when component is mounted 
  componentDidMount() {
    window.addEventListener('resize', this.onResize); 
    this.onResize();
  }

  // remove listeners when component is unmounted
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); }

  // handle resizes of the screen
  onResize() {

      this.changeScreen(this.getLayoutMode())
      this.setState({
          layoutMode: this.getLayoutMode(),
      });
  }

  // determine if user is on desktop or mobile
  getLayoutMode() {

    // looks a bit complicated, but it basically first checks if a user is on desktop,
    // then if the phone is held portrait or landscape
    return window.innerWidth > 880 ? 
      'desktop'
      :
      window.innerHeight > window.innerWidth ?
      'portrait'
      :
      'landscape'
  }

  changeScreen = layout => {

    if (!this.gameContainer.current) return;
    if (layout === 'landscape'){
      // show the container
      this.gameContainer.current.style.display = 'block';
    }
    else {
      // show the container
      this.gameContainer.current.style.display = 'none';
    }
  }

  startGame = () => {

    console.log(this.getLayoutMode())
    // set the state
    this.setState({start: true, layoutMode: this.getLayoutMode()});

  }

  render(){
  return (
    <div className="App">

      {this.state.start ?

        <div className="App">
          {/* Run start here, if done change state to go to app */}
          {/*  style={{display: 'none'}} */}
          <div className="App-container" ref={this.gameContainer} style={this.state.layoutMode === 'portrait' ? {display: 'none'} : {display: 'block'}}> 
            <Base/>
          </div>
          
          {this.state.layoutMode === 'landscape' ? 

            // on landscape show nothing, as the above div will just be shown
            // we do this such that the Base component will not be reloaded and progress will not be lost
            null

              : 

            /* // if it is portrait, user should put the phone to landscape mode */
            this.state.layoutMode === 'portrait' ?

            // TODO IMPROVE THIS
            <div className="screen-warning">
              <div className="screen-warning-text"><p>Please turn your phone to landscape mode</p></div>
              <img 
                  src= {process.env.PUBLIC_URL + `/Gifs/quest_cape.gif`} 
                  className="screen-warning-video"
                  alt=""
              />

              <img 
                src= {process.env.PUBLIC_URL + `/Images/change_screen.png`} 
                className="screen-warning-change"
                alt=""
              />

            </div>

            // otherwise it is desktop
            :
            <div className="screen-warning">This app is built for mobile phone!</div>
          }
        </div>

        :
          <div>
          <Start onStart={this.startGame}/>
          {/* <div className="App-container" ref={this.gameContainer}></div> */}
          </div>
        }
      
    </div>
  );
  }
}

export default App;
