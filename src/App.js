import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import AlbumList from './AlbumList'
import Album from "./Album";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm">
          <i className="fas fa-images"></i>
          <Link to={{pathname: '/'}}>Home</Link>
          <Link to={{pathname: '/albums'}}>
                Afficher Album
          </Link>
        </nav>
          <Route path='/albums' component={AlbumList}/>
          <Route exact path='/albums?page=(\d+)' component={AlbumList}/>
          <Route path='/albums/:id(\d+)' component={Album}/>
      </div>
    );
  }
}

export default App;