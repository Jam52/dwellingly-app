import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { LoginForm } from './views/login';
import { Home } from './views/home';
import Header from './components/Header';
import { NavMenu } from './components/NavigationMenu/navigationMenu.js';
// <NavMenu />

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavMenu />
        <Header />
        <ul>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path='/signup' />
          <Route exact path='/terms' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
