import React, { Component } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {

  state = {
    page: () => <Home changePage={ this.setPage } />,
  }

  setPage = (newPage) => {
    switch(newPage) {
      case "Game":
        this.setState({ page: () => <Game changePage={ this.setPage } /> });
        break;
      case "Dashboard":
        this.setState({ page: () => <Dashboard changePage={ this.setPage } /> });
        break;
      default:
        this.setState({ page: () => <Home changePage={ this.setPage } /> });
        break;
    }
  }

  render() {
    const CurrentPage = this.state.page;

    return (
      <div >
        <CurrentPage />
      </div>
    );
  }
}

export default App;
