import React, { Component } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import './App.css';

class App extends Component {

  state = {
    page: () => <Home changePage={ this.setPage } />,
    stats: {
      dealerWins: 0,
      playerWins: 0,
      ties: 0,
      dealerBusts: 0,
      playerBusts: 0,
      dealerBlackJacks: 0,
      playerBlackJacks: 0,
    },
  }

  setPage = (newPage) => {
    switch(newPage) {
      case "Game":
        this.setState({ page: () => <Game changePage={ this.setPage } gameStats={ this.state.stats }/> });
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
