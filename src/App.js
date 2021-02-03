import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Formate from './components/Formate'
import View from './components/View'
import Login from './components/Login'
import Registration from './components/Register'

class App extends React.Component {
  render(){
    return(
      <Router>
      <div>
        <Route path='/' exact component={Login}></Route>
        <Route path='/Registration' exact component={Registration}></Route>
        <Route path='/view' exact component={View}></Route>
        <Route path='/submit' exact component={Formate}></Route>
      </div>
      </Router>
    )
  }
}

export default App;
