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
    }

    componentDidMount(){
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
        this.dealCard('player');
        this.dealCard('dealer');
        this.dealCard('player');
        this.dealCard('dealer');
        this.checkForBlackJack();
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

    endGame = () => {
        let playerTotal = this.getTotal('player');
        let dealerTotal = this.getTotal('dealer', false);

        if((playerTotal > dealerTotal && playerTotal <= 21) || dealerTotal > 21) {
            this.state.gameMessages.push('You won!');
            this.props.gameStats.playerWins += 1;
        }
        else if(playerTotal < dealerTotal || playerTotal > 21) {
            this.state.gameMessages.push('You lost!');
            this.props.gameStats.dealerWins += 1;
        }
        else {
            this.state.gameMessages.push('You tied!');
            this.props.gameStats.ties += 1;
            
        }
        this.setState({ gameOver: true });
    }

    checkForBlackJack = () => {
        if(this.getTotal('player') === 21 && this.hasBlackJack('player')) {
            this.props.gameStats.playerBlackJacks += 1;
        }
        else if(this.getTotal('dealer') === 21 && this.hasBlackJack('dealer')) {
            this.props.gameStats.dealerBlackJacks += 1;
        }
    }

    hasBlackJack = (player) => {
        let hadJack = false;

        if(player === 'player') {
            this.state.playerHand.forEach(card => {
                if((card.rank === 'Jack' && (card.suit === 'Clubs' || card.suit === 'Spades')) || card.rank === 'Ace') {
                    hadJack = true;
                }
            });
        }
        else if(player === 'dealer') {
            this.state.dealerHand.forEach(card => {
                if((card.rank === 'Jack' && (card.suit === 'Clubs' || card.suit === 'Spades')) || card.rank === 'Ace')  {
                    hadJack = true;
                }
            });
        }
        return hadJack;
    }

    getTotal = (player, hideDealer = true) => {
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
            
            for(let i = 0; i < numberOfAces && !done; i++) {
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
                let card = this.state.dealerHand[0];
                if(card && card.rank !== 'Ace' && hideDealer && !this.state.gameOver) {
                    hiddenCard = this.getValue(card.rank);
                }
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

    hit = (player) => {
        this.dealCard(player);
        let wasBust = this.isBust(player);
        if(wasBust) {
            if(player === 'player') {
                this.state.gameMessages.push('You went bust');
                this.state.gameMessages.push('You lost!');
                this.props.gameStats.playerBusts += 1;
                this.props.gameStats.dealerWins += 1;
            }
    
            else if(player === 'dealer') {
                this.state.gameMessages.push('Dealer went bust');
                this.props.gameStats.dealerBusts += 1;   
            }
            this.setState({ playerHold: true });
            this.setState({ gameOver: true });
        }
        return wasBust;
    }

    dealCard = (player) => {
        if(player === 'player' && !this.state.playerHold) {
            let card = this.getRandomCard();
            if(card) {
                this.state.playerHand.push(card);
                this.setState((prevState) => ({
                    cardsDealt: prevState.cardsDealt + 1,
                }));
            }
        }

        else if(player === 'dealer' && !this.state.dealerHold) {
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
            this.dealersTurn();
        }
        else if(player === 'dealer') {
            this.setState({ dealerHold: true });
            this.state.gameMessages.push('The dealer held');
            this.setState({ gameOver: true });
        }
        
    }

    dealersTurn = () => {
        let done = false;

        while(!done) {
            if(this.getTotal('dealer', false) >= 17) {
                this.hold('dealer');
                done = true;
            }
            else {
                done = this.hit('dealer');
            }
        }
        this.endGame();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <ActionBar changePage={ this.props.changePage } hit={ this.hit } hold={ this.hold } playerHeld={ this.state.playerHold } stats={ this.props.gameStats } playerTotal={ this.getTotal('player') } dealerTotal={ this.getTotal('dealer') } messages={ this.state.gameMessages } />
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
