import React, { Component } from 'react';
import DealerHand from './DealerHand';
import PlayerHand from './PlayerHand';
import Deck from '../data/Deck';
const background = 'images/background.jpg';

const styles = {
    root: {
        height: '100%',
        backgroundImage: `url(${ background })`,
        backgroundSize: 'cover',
    }
};

class Game extends Component {
    
    state = {
        deck: Deck,
        cardBacks: "Simple Suits",
        playerHand: [],
        dealerHand: [],
    };

    getRandomCard = () => {

        let card;

        if(this.state.deck.length >= 0) {

            let index = Math.floor(Math.random() * this.state.deck.length);
            
            card = this.state.deck[index];

            this.state.deck.splice(index, 1);
        }

        return card;
    }

    dealCards = (cards, player = null, dealer = null) => {

        for(let i = 0; i < cards; i++) {
            if(player != null) {
                player.push(this.getRandomCard());
            }
            if(dealer != null) {
                dealer.push(this.getRandomCard());
            }
        }
    };

    startGame = () => {

        this.dealCards(2, this.state.playerHand, this.state.dealerHand);

    };

    render() {
        return (
            <div style={ styles.root }>
                <button onClick={ () => this.startGame() } />
                <DealerHand cardBacks dealerHand />
                <PlayerHand cardBacks playerHand />
            </div>
        );
    }
}

export default Game;
