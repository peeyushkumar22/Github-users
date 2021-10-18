import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import SearchComponent from './component/SearchComponent';
import UserProfile from './component/UserProfile';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SearchComponent} />
        <Route exact path='/UserProfile' component={UserProfile}/>
      </Switch>
    </Router>
  );
}

export default App;
