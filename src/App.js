import React, { Component } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Rules from './components/Rules';
import './App.css';

class App extends Component {
    /** 
     * Sets state for: 
     *      the current page, defaults to Home page
     *      stats from all games, defaults all to 0
     */
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
    
    //Sets the page to the new page passed, defaults to Home page
    setPage = (newPage) => {
        switch (newPage) {
            case 'Game':
                this.setState({ page: () => <Game changePage={ this.setPage } gameStats={ this.state.stats } /> });
                break;
            case 'Rules':
                this.setState({ page: () => <Rules changePage={ this.setPage } /> });
                break;
            default: 
                this.setState({ page: () => < Home changePage={ this.setPage } /> });
                break;
        }
    }

    render() {
        const CurrentPage = this.state.page;

        /**
         * Displays the current page, default is Home page
         * Other pages include the Game and Rules pages
         */
        return ( 
            <div>
                <CurrentPage />
            </div>
        );
    }
}

export default App;