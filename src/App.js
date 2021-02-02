import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Formate from './components/Formate'
import View from './components/View'


class App extends React.Component {
  render(){
    return(
      <Router>
      <div>
        <Route path='/' exact component={View}></Route>
        <Route path='https://happy-morse-436987.netlify.app/submit' exact component={Formate}></Route>
      </div>
      </Router>
    )
  }
}

export default App;
