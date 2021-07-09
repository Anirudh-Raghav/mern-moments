import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/home/home.js';
import Auth from './pages/auth/auth.js';
import Navbar from './components/navbar/navbar.js';

function App() {
  const user = JSON.parse(localStorage.getItem('login'));

  const checkEmptyObject = (obj) => (obj && Object.keys(obj).length === 0 && obj.constructor === Object);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={() => (checkEmptyObject(user) ? <Auth /> : <Redirect to="/" />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
