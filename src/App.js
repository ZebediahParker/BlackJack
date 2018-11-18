import React, { Component } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {

  state = {
    page: "Home",
  }

  setPage = (newPage) => {
    if(newPage !== this.state.page) {
      this.setState({ page: newPage });
    }
  }

  getPage = () => {
    switch(this.state.page) {
      case 'Home':
        return <Home changePage={ this.setPage } />;
      case "Game":
        return <Game changePage={ this.setPage } />;
      case "Dashboard":
        return <Dashboard />;
      default:
        return <Home changePage={ this.setPage } />;
    }
  }

  render() {
    return (
      <div >
        { this.getPage() }
      </div>
    );
  }
}

export default App;
