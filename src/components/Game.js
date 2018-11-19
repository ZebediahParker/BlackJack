import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DealerHand from './DealerHand';
import PlayerHand from './PlayerHand';
import ActionBar from './ActionBar';
import Deck from '../data/Deck';
const background = '/images/background.jpg';

const styles = {
    root: {
        display: 'block',
        height: '100vh',
        width: '85%',
        backgroundImage: `url(${ background })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    content: {
        align: 'center',
    }
}

class Game extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            gameMessages: ['Game Started'],
            deck: [].concat(Deck),
            playerHand: [],
            dealerHand: [],
            playerHold: false,
            dealerHold: false,
            gameOver: false,
            cardsDealt: 0,
        }
        this.startGame();
    }
    
    getRandomCard = () => {
        let card;

        if(this.state.deck.length >= 0) {
            let index = Math.floor(Math.random() * this.state.deck.length);
            card = this.state.deck[index];
            
            this.state.deck.splice(index, 1);
        }

        return card;
    }

    getValue = (rank) => {
        let cardValue = 0;

        if(isNaN(rank)) {
            if(rank !== 'Ace') {
                cardValue = 10;
            }

            else {
                cardValue = 11;
            }
        }

        else {
            cardValue = parseInt(rank);
        }

        return cardValue;
    }

    getNumberOfAces = (player) => {
        let numberOfAces = 0;

        if(player === 'player'){
            this.state.playerHand.forEach(card => {
                if(card.rank === 'Ace') {
                    numberOfAces++;
                }
            });
        }

        else {
            this.state.dealerHand.forEach(card => {
                if(card.rank === 'Ace') {
                    numberOfAces++;
                }
            });
        }
        
        return numberOfAces;
    }

    startGame = () => {
        this.dealCard();
        this.dealCard();
    }

    resetGame = () => {

        this.setState({ 
            gameMessage: ['Game Started'],
            deck: [].concat(Deck),
            playerHand: [],
            dealerHand: [],
            playerTotal: 0,
            dealerTotal: 0,
            playerHold: false,
            dealerHold: false,
        });

        this.props.changePage('Game');
    }

    getTotal = (player) => {
        let isBust = false;
        let total = 0;
        if(player === 'player') {
            this.state.playerHand.forEach(card => {
                total += this.getValue(card.rank);
            });
        }

        else {
            this.state.dealerHand.forEach(card => {
                total += this.getValue(card.rank);
            });
        }

        if(total > 21) {
            isBust = true;
            let done = false;
            let numberOfAces = this.getNumberOfAces(player);
            
            for(let i = 0; i < numberOfAces && !done; i++){
                total -= 10;

                if(total <= 21) {
                    done = true;
                    isBust = false;
                }
            }
        }

        if(player === 'dealer') {
            let hiddenCard = 0;

            if(!isBust) {
                hiddenCard = this.getValue(this.state.dealerHand[0].rank);
            }

            return total - hiddenCard;
        }

        else if(player === 'player') {
            return total;
        }

    }

    isBust = (player) => {
        return this.getTotal(player) > 21;
    }

    hit = () => {
        this.dealCard();

        if(this.isBust('player')) {
            this.state.gameMessages.push('You lost!');
            this.setState({ gameOver: true });
        }

        else if(this.isBust('dealer')) {
            this.state.gameMessages.push('You won!');
            this.setState({ gameOver: true });
        }
    }

    dealCard = () => {
        if(!this.state.playerHold) {
            let card = this.getRandomCard();
            if(card) {
                this.state.playerHand.push(card);
                this.setState((prevState) => ({
                    cardsDealt: prevState.cardsDealt + 1,
                }));
            }
        }

        if(!this.state.dealerHold) {
            let card = this.getRandomCard();
            if(card) {
                this.state.dealerHand.push(card);
                this.setState((prevState) => ({
                    cardsDealt: prevState.cardsDealt + 1,
                }));
            }
        }        
    }

    hold = (player) => {
        if(player === 'player') {
            this.setState({ playerHold: true });
            this.state.gameMessages.push('You held');
        }

        else if(player === 'dealer') {
            this.setState({ dealerHold: true });
            this.state.gameMessages.push('The dealer held');
        }
        
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <ActionBar changePage={ this.props.changePage } hit={ this.hit } hold={ this.hold } playerTotal={ this.getTotal('player') } dealerTotal={ this.getTotal('dealer') } messages={ this.state.gameMessages } />
                <div className={ classes.root }>
                    <div className={ classes.content }>
                        <DealerHand className={ classes.item } hand={ this.state.dealerHand } hideCard={ this.state.gameOver } />
                        <PlayerHand className={ classes.item } hand={ this.state.playerHand } />          
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Game);
