import React, { Component } from 'react';
import Game from './components/Game';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {

  state = {
    page: "Game",
  };

  setPage = (newPage) => {
    if(newPage !== this.state.page) {
      this.setState({
        page: newPage,
      });
    }
  };

  getPage = () => {
    switch(this.state.page) {
      case "Game":
        return <Game changePage={ this.setPage }/>;
      case "Dashboard":
        return <Dashboard />;
      default:
        return <Game />;
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
