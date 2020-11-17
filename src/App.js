import React, { Component } from "react";

import './App.css';
import './styles.css';

import Layout from "./Components/Layout";

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
    };

    // create resize handler
    this.onResize = this.onResize.bind(this);
   
  }

  // add listeners when component is mounted 
  componentDidMount() { window.addEventListener('resize', this.onResize); }

  // remove listeners when component is unmounted
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); }

  // handle resizes of the screen
  onResize() {
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

  render(){
  return (
    <div className="App">
      
      {this.state.layoutMode === 'landscape' ? 

        // the page loaded on landscape will be the correct one,
        // where we will install the app
        <Layout/>

          : 

        // if it is portrait, user should put the phone to landscape mode
        this.state.layoutMode === 'portrait' ?

        <div className="screen-warning">
          <p>Please turn your phone to landscape mode</p>
        </div>

        // otherwise it is desktop
        :
        <div className="screen-warning">This app is built for mobile phone!</div>
      }
    </div>
  );
  }
}

export default App;
