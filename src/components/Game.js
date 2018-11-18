import React, { Component } from 'react';
import { Button, Modal, Typography } from '@material-ui/core';
import DealerHand from './DealerHand';
import PlayerHand from './PlayerHand';
import Deck from '../data/Deck';
const background = '/images/background.jpg';

const styles = {
    root: {
        height: '100%',
        backgroundImage: `url(${ background })`,
        backgroundSize: 'cover',
    },
}

class Game extends Component {
    
    state = {
        gameState: 'Not Started',
        round: 0,
        deck: Deck,
        cardBacks: "Simple Suits",
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
        console.log(this.state);
        this.dealCards(2, 'both');
        this.setState({ gameState: 'Ongoing' });
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
            this.setState({ gameState: 'Dealer won' });
        }

        else if(this.isBust('dealer')) {
            this.setState({ gameState: 'Player won' })
        }

        this.setState({ round: this.state.round + 1 })
    }

    getButtons = () => {
        switch(this.state.gameState) {
            case 'Not Started':
                return (
                    <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={ true }>
                        <Button variant='contained' onClick={ () => this.startGame() }>Start Game</Button>
                    </Modal>
                );

            case 'Ongoing':
                return (
                    <div>
                        <Button variant='contained' onClick={ () => this.dealCards(1, 'dealer') }>Hit Dealer</Button>
                        <Button variant='contained' onClick={ () => this.dealCards(1, 'player') }>Hit Me</Button>
                    </div>
                );

            case 'Player won':
                return (
                    <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={ true }>
                        <Typography variant="h6" id="modal-title">
                            You won! Do you want to play again?
                            <Button variant='contained' onClick={ () => this.startGame() }>Start Game</Button>
                        </Typography>
                    </Modal>
                );
                    
            case 'Dealer won':
                return (
                    <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={ true }>
                        <Typography variant="h6" id="modal-title">
                            You lost! Do you want to play again?
                            <Button variant='contained' onClick={ () => this.startGame() }>Start Game</Button>
                        </Typography>
                    </Modal>
                );
            default:
                return (
                    <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={ true }>
                        <Button variant='contained' onClick={ () => this.startGame() }>Start Game</Button>
                    </Modal>
                );
        }
    }

    render() {
        return (
            <div style={ styles.root }>
                <DealerHand back={ this.state.cardBacks } hand={ this.state.dealerHand } />
                <PlayerHand back={ this.state.cardBacks } hand={ this.state.playerHand } />          
                { this.getButtons() }
            </div>
        );
    }
}

export default Game;
