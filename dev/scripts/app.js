import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './components/LandingPage';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
    
    };
  }

  render() {
    return (
      <div>
        < LandingPage/>

      </div>
    )
  }  
  }



  


ReactDOM.render(<App />, document.getElementById('app'));
