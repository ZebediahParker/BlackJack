import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DealerHand from './DealerHand';
import PlayerHand from './PlayerHand';
import Dashboard from './Dashboard';
import ActionBar from './ActionBar';
import Deck from '../data/Deck';
import { Typography } from '@material-ui/core';

//Sets styles for Game component
const styles = {
    root: {
        display: 'flex',
        height: '100vh',
        width: '100%',
        backgroundColor: '#01a51a',
        justifyContent: 'center',
        overflowX: 'hidden',
        overflowY: 'hidden',
    },
    dealer: {
        position: 'absolute',
        top: "5%",
        left: '5%',
        width: '95%',
    },
    player: {
        position: 'absolute',
        bottom: "7%",
        left: '5%',
        width: '95%',
    }
}

class Game extends Component {
    
    /**
     * Sets the game state for the Deck,
     * player and dealer hands, whether the
     * player or dealer has held, and whether
     * the game is over
     */
    constructor(props) {
        super(props);
        this.state = {
            gameMessages: [],
            deck: [].concat(Deck),
            playerHand: [],
            dealerHand: [],
            playerHold: false,
            dealerHold: false,
            gameOver: false,
            cardsDealt: 0,
        }
    }
    
    /**
     * Once the component is mounted it starts the game
     */
    componentDidMount() {
        this.startGame();
    }
    
    /**
     * Starts the game by pushing the message 'Game Started' onto the gameMessages array
     * Then deals two cards to each player one at a time
     * Checks to see if either player has BlackJack
     */
    startGame = () => {
        this.state.gameMessages.push('Game Started');
        this.dealCard('player');
        this.dealCard('dealer');
        this.dealCard('player');
        this.dealCard('dealer');
        this.checkForBlackJack();
    }
    
    /**
     * Ends the game and determines who the winner is, or if there was a tie
     */
    endGame = () => {
        let playerTotal = this.getTotal('player');
        let dealerTotal = this.getTotal('dealer', false);

        if ((playerTotal > dealerTotal && playerTotal <= 21) || dealerTotal > 21) {
            this.state.gameMessages.push('You won!');
            this.props.gameStats.playerWins += 1;
        } 
        else if (playerTotal < dealerTotal || playerTotal > 21) {
            this.state.gameMessages.push('You lost!');
            this.props.gameStats.dealerWins += 1;
        } 
        else {
            this.state.gameMessages.push('You tied!');
            this.props.gameStats.ties += 1;

        }
        this.setState({ playerHold: true });
        this.setState({ gameOver: true });
    }
    
    /**
     * Resets the game by setting the state back to the initial state
     */
    resetGame = () => {

        this.setState({
            gameMessage: [],
            deck: [].concat(Deck),
            playerHand: [],
            dealerHand: [],
            playerTotal: 0,
            dealerTotal: 0,
            playerHold: false,
            dealerHold: false,
            cardsDealt: 0,
        });

        this.props.changePage('Game');
    }
    
    /**
     * Starts the dealer's turn, if the dealer's total is 17 or greater they hold
     * otherwise they are dealt another card
     * Ends game once the dealer either holds, or busts
     */
    dealersTurn = () => {
        let done = false;

        while (!done) {
            //Checks if dealer's count is 17 or greater
            if (this.getTotal('dealer', false) >= 17) {
                this.hold('dealer');
                done = true;
            } 
            //If the dealer's count is less than 17 they must hit
            else {
                done = this.hit('dealer');
            }
        }
        //After the dealer is done the game is over
        this.endGame();
    }
    
    /**
     * Holds the given player, and pushes the appropriate '... held' message
     * If the player held, then starts dealer's turn
     * If the dealer held, then ends the game
     */
    hold = (player) => {
        //For either the player or dealer sets their status as holding
        if (player === 'player') {
            this.setState({ playerHold: true });
            this.state.gameMessages.push('You held');
            this.dealersTurn();
        } 
        else if (player === 'dealer') {
            this.setState({ dealerHold: true });
            this.state.gameMessages.push('The dealer held');
            this.setState({ gameOver: true });
        }

    }
    
    /**
     * Deals a card to the given player, checks if the player busted
     * and then pushes the appropriate win/lose message, and ends game
     */
    hit = (player) => {
        //Deals card to the given player
        this.dealCard(player);
        let wasBust = this.getTotal(player) > 21;
        //If the player or dealer busted assigns the appropriate message and edits the stats accordingly
        if (wasBust) {
            if (player === 'player') {
                this.state.gameMessages.push('You busted');
                this.state.gameMessages.push('You lost!');
                this.props.gameStats.playerBusts += 1;
                this.props.gameStats.dealerWins += 1;
            } 
            else if (player === 'dealer') {
                this.state.gameMessages.push('The dealer busted');
                this.props.gameStats.dealerBusts += 1;
            }
            this.setState({ playerHold: true });
            this.setState({ gameOver: true });
        }
        return wasBust;
    }
    
    /**
     * Deals a random card to the given player
     */
    dealCard = (player) => {

        //For either the player or dealer makes sure they have not held and then deals a random card
        if (player === 'player' && !this.state.playerHold) {
            let card = this.getRandomCard();
            if (card) {
                this.state.playerHand.push(card);
                this.setState((prevState) => ({
                    cardsDealt: prevState.cardsDealt + 1,
                }));
            }
        } 
        else if (player === 'dealer' && !this.state.dealerHold) {
            let card = this.getRandomCard();
            if (card) {
                this.state.dealerHand.push(card);
                this.setState((prevState) => ({
                    cardsDealt: prevState.cardsDealt + 1,
                }));
            }
        }
    }
    
    /**
     * Gets a random card from the deck to be dealt to the player
     */
    getRandomCard = () => {
        let card;

        if (this.state.deck.length >= 0) {
            //Gets random number between 0 and the length of the deck - 1
            let index = Math.floor(Math.random() * this.state.deck.length);
            //Gets the random card using the index
            card = this.state.deck[index];
            //Removes the card from the deck so that it cannot be dealt again
            this.state.deck.splice(index, 1);
        }

        return card;
    }
    
    /**
     * Gets the total for the given player by counting the value of each
     * card in that player's hand. If hideDealer is set to true then the
     * first card of the dealer's hand is not counted toward their total
     * If the player busts and has an Ace then 10 points are removed from
     * their total per Ace until they are under 21, so that the Ace will
     * only count as 1 point towards their total
     */
    getTotal = (player, hideDealer = true) => {
        let isBust = false;
        let total = 0;
        //Gets total count of either player or dealer's hand
        if (player === 'player') {
            this.state.playerHand.forEach(card => {
                total += this.getValue(card.rank);
            });
        } 
        else {
            this.state.dealerHand.forEach(card => {
                total += this.getValue(card.rank);
            });
        }
        
        //If the count is over 21 then checks if they have Aces that can be counted as 1 instead of 11
        if (total > 21) {
            isBust = true;
            let done = false;
            let numberOfAces = this.getNumberOfAces(player);

            for (let i = 0; i < numberOfAces && !done; i++) {
                total -= 10;
                
                //Rechecks so that only as many Aces as needed are counted as 1
                if (total <= 21) {
                    done = true;
                    isBust = false;
                }
            }
        }

        //Determines whether or not to include the dealer's hidden card value
        if (player === 'dealer') {
            let hiddenCard = 0;

            if (!isBust) {
                let card = this.state.dealerHand[0];
                //Ensures that the value stays hidden until necessary, so that the player cannot determine the value of the hidden card
                if (card && card.rank !== 'Ace' && hideDealer && !this.state.gameOver) {
                    hiddenCard = this.getValue(card.rank);
                }
            }
            return total - hiddenCard;
        } 
        else if (player === 'player') {
            return total;
        }
    }
    
    /**
     * Gets the value of the rank that was passed.
     * All face cards have a value of 10 and the
     * Ace has a value of 11
     */
    getValue = (rank) => {
        let cardValue = 0;

        //Checks if the rank is not a number
        if (isNaN(rank)) {
            //If it's not a number and not an Ace then it's a face card with value of 10
            if (rank !== 'Ace') {
                cardValue = 10;
            } 
            //It is an Ace with value of 11
            else {
                cardValue = 11;
            }
        } 
        //It is a number and the value is parsed as an int
        else {
            cardValue = parseInt(rank);
        }
        return cardValue;
    }
    
    /**
     * Finds the number of Aces in the given player's
     * hand to determine how many points should be 
     * deducted if the given player was bust
     */
    getNumberOfAces = (player) => {
        let numberOfAces = 0;

        //Counts the number of Aces for either the player or dealer
        if (player === 'player') {
            this.state.playerHand.forEach(card => {
                if (card.rank === 'Ace') {
                    numberOfAces++;
                }
            });
        } 
        else {
            this.state.dealerHand.forEach(card => {
                if (card.rank === 'Ace') {
                    numberOfAces++;
                }
            });
        }
        return numberOfAces;
    }
    
    /**
     * Checks if either player has Black Jack at the beginning of the game
     */
    checkForBlackJack = () => {
        if (this.getTotal('player') === 21 && this.hasBlackJack('player')) {
            this.props.gameStats.playerBlackJacks += 1;
            this.endGame();
        } 
        else if (this.getTotal('dealer') === 21 && this.hasBlackJack('dealer')) {
            this.props.gameStats.dealerBlackJacks += 1;
            this.endGame();
        }
    }
    
    /**
     * Checks to see if the player has either a black Jack or an Ace
     * that would give him BlackJack and pushes the appropriate message
     */
    hasBlackJack = (player) => {
        let blackJack = false;
        if (player === 'player') {
            this.state.playerHand.forEach(card => {
                if ((card.rank === 'Ace') || (card.rank === 'Jack' && (card.suit === 'Clubs' || card.suit === 'Spades'))) {
                    blackJack = true;
                    this.state.gameMessages.push('You had Black Jack!');
                } 
            });
        } 
        else if (player === 'dealer') {
            this.state.dealerHand.forEach(card => {
                if ((card.rank === 'Ace') || (card.rank === 'Jack' && (card.suit === 'Clubs' || card.suit === 'Spades'))) {
                    blackJack = true;
                    this.state.gameMessages.push('The dealer had Black Jack!');
                } 
            });
        }
        return blackJack;
    }

    render() {
        const { classes } = this.props;

        /**
         * Displays the ActionBar, and Dashboard and the dealer's hand and the player's hand on the Game board using
         * the ActionBar, DealerHand, and PlayerHand components
         */
        return ( 
            <div className={ classes.root }>
                {/* Displays the Dashboard on the right side of the game board */}
                <Dashboard stats={ this.props.gameStats } playerTotal={ this.getTotal('player') } dealerTotal={ this.getTotal('dealer') } messages={ this.state.gameMessages } /> 
                {/* Displays the dealer's hand */}
                <div className={ classes.dealer }>
                    <Typography variant = 'h4'>Dealer's Hand</Typography> 
                    <DealerHand hand={ this.state.dealerHand } hideCard={ !this.state.gameOver } /> 
                </div>
                {/* Displays the player's hand */}
                <div className={ classes.player }>
                    <Typography variant='h4'>Player's Hand</Typography>
                    <PlayerHand hand={ this.state.playerHand } />
                </div>        
                <div>
                    <ActionBar changePage={ this.props.changePage } hit={ this.hit } hold={ this.hold } playerHeld={ this.state.playerHold } />  
                </div> 
            </div>
        );
    }
}

export default withStyles(styles)(Game);