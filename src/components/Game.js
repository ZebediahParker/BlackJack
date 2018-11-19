import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DealerHand from './DealerHand';
import PlayerHand from './PlayerHand';
import Deck from '../data/Deck';
const background = '/images/background.jpg';

const styles = {
    root: {
        height: '100vh',
        backgroundImage: `url(${ background })`,
        backgroundSize: 'cover',
        
    },
}

class Game extends Component {
    
    state = {
        open: true,
        gameMessage: 'Black Jack',
        round: 1,
        deck: Deck,
        playerHand: [],
        dealerHand: [],
        playerTotal: 0,
        dealerTotal: 0,
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
        this.toggleOpen();
        this.dealCards(2, 'both');
    }

    resetGame = () => {
        this.setState((prevState) => ({ 
            deck: Deck.concat(prevState.playerHand, prevState.dealerHand),
            playerTotal: 0,
            playerHand: [],
            dealerTotal: 0,
            dealerHand: [],
            round: prevState.round + 1, 
        }));
    }

    isBust = (player) => {
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

            this.setState({ dealerTotal: total - hiddenCard })
        }

        else if(player === 'player') {
            this.setState({ playerTotal: total })
        }

        return isBust;
    }

    dealCards = (cards, player) => {
        for(let i = 0; i < cards; i++) {
            if(player === 'player' || player === 'both') {
                let card = this.getRandomCard();
                if(card) {
                    this.state.playerHand.push(card);
                }
            }

            if(player === 'dealer' || player === 'both') {
                let card = this.getRandomCard();
                if(card) {
                    this.state.dealerHand.push(card);
                }
            }
        }

        if(this.isBust('player')) {
            this.setState({ gameMessage: 'You lost!' });
            this.toggleOpen();
        }

        else if(this.isBust('dealer')) {
            this.setState({ gameMessage: 'You won!' });
            this.toggleOpen();
        }
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
    }

    getAction = () => {
        if(this.state.round !== 1) {
            this.resetGame();
        }

        this.startGame();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <Dialog open={ this.state.open } disableBackdropClick={ true } onClose={ this.toggleOpen } aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                    <DialogTitle>
                        { this.state.gameMessage }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Do you want to start the game?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ this.getAction } color="primary">
                            Deal Cards
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className={ classes.content }>
                    <div>
                        <DealerHand className={ classes.item } back={ this.state.cardBacks } hand={ this.state.dealerHand } />
                        <PlayerHand className={ classes.item } back={ this.state.cardBacks } hand={ this.state.playerHand } />          
                        <Button className={ classes.item } variant='contained' onClick={ () => this.dealCards(1, 'dealer') }>Hit Dealer</Button>
                        <Button className={ classes.item } variant='contained' onClick={ () => this.dealCards(1, 'player') }>Hit Me</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Game);
