import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';

const styles = {
  card: {
    minWidth: 275,
  },
}

class Rules extends Component {
    /**
     * Lists the rules of BlackJack using the Card and Typography components 
     */
    render() {
      const { classes } = this.props;

      return (
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant='h4' gutterBottom>
                BlackJack Rules
              </Typography>
              <Typography variant='h6'>
                Goal
              </Typography>
              <Typography component="p" paragraph>
                &emsp;Each participant attempts to beat the dealer by getting a count as close to 21 as possible, without going over 21.
              </Typography>
              <Typography variant='h6'>
                Card Values
              </Typography>
              <Typography component="p" paragraph>
                &emsp;The cards that are dealt come from a single deck, and each is associated with a specific value that goes toward your count. Cards with a rank of 2 - 10 have a value equivalent to their rank, face cards(Jack, Queen, King) each have a value of 10, and Aces can have either a value of 11 or 1.
              </Typography>
              <Typography variant='h6'>
                Game Start
              </Typography>
              <Typography component="p" paragraph>
                &emsp;The game begins by first dealing two cards to each player. The dealer will have one card face-down, while everyone else has their cards face up.
              </Typography>
              <Typography variant='h6'>
                Player's Turn
              </Typography>
              <Typography component="p" paragraph>
                &emsp;Each player is given the option to 'hit' or 'hold.' If a player can choose to 'hit' any number of times, so long as their count remains at or below 21. If a player chooses to 'hold' then they cannot recieve any more cards and play proceeds to the next player.
              </Typography>
              <Typography variant='h6'>
                Dealer's Turn
              </Typography>
              <Typography component="p" paragraph>
                &emsp;After the players have taken their turns the dealer is presented with the same actions that the players are but the dealer must 'hold' if they have a count of 17 or greater, and must 'hit' if they have a count less than 17.
              </Typography>
              <Typography variant='h6'>
                Bust
              </Typography>
              <Typography component="p" paragraph>
                &emsp;If either the player or dealer goes over 21 then they 'bust' and the other person wins.
              </Typography>
              <Typography variant='h6'>
                BlackJack
              </Typography>
              <Typography component="p" paragraph>
                &emsp;After the cards are dealt if a player has an Ace or black Jack(Jack of Clubs or Spades) and a 10, a face card or an Ace, then they have 'Black Jack' and their count is to be considered 21 and they win automatically. However, if the dealer also has 'Black Jack' then the result is a tie.
              </Typography>
              <Typography variant='h6'>
                Getting Started
              </Typography>
              <Typography component="p" paragraph>
                &emsp;To start playing just go back to the home page and click the 'Start Game' button. This will take you to the game where you'll be able to play. On the upper left-hand side you will see the dealer's hand, on the lower left-hand side you will see your hand, at the bottom of the screen you will see the actions you can take 'hit,' 'hold,' or 'restart,' and then on the right-hand side you will see the stats from all games that you've played, the current counts for the dealer and yourself, and then messages to show a log of the actions taken. Good luck and have fun!
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained' onClick={ () => this.props.changePage('Home') }>Return to Home</Button>
            </CardActions>
          </Card>
        </div>
      );
    }
}
export default withStyles(styles)(Rules);
