import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  root: {
    display: 'block',
    width: '20%',
  },
  drawer: {
    display: 'block',
    width: '100%',
  },
  title: {
    marginLeft: '20px',
    marginTop: '20px',
  },
  action: {
    borderWidth: 0.5,
  }
}

class ActionBar extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Paper className={ classes.root }>
        <Drawer className={ classes.drawer } variant='permanent' anchor='right'>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Game Stats</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                <ListItem>
                  <ListItemText>Player Wins: { this.props.stats.playerWins }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Dealer Wins: { this.props.stats.dealerWins }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Ties: { this.props.stats.ties }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Player Busts: { this.props.stats.playerBusts }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Dealer Busts: { this.props.stats.dealerBusts }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Player BlackJacks: { this.props.stats.playerBlackJacks }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Dealer BlackJacks: { this.props.stats.dealerBlackJacks }</ListItemText>
                </ListItem>
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Divider />
          <Typography className={ classes.title } variant='h6'>Current Totals</Typography>
          <List>
            <ListItem>
              <ListItemText>Player: { this.props.playerTotal }</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Dealer: { this.props.dealerTotal }</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Typography className={ classes.title } variant='h6'>Actions</Typography>
          <List>
            <ListItem button disabled={ this.props.playerHeld } onClick={ () => this.props.hit('player') }>
              <ListItemText className={ classes.action }>Deal Card</ListItemText>
            </ListItem>
            <ListItem button disabled={ this.props.playerHeld } onClick={ () => this.props.hold('player') }>
              <ListItemText className={ classes.action }>Hold</ListItemText>
            </ListItem>
            <ListItem button onClick={ () => this.props.changePage('Game')}>
              <ListItemText className={ classes.action }>Reset Game</ListItemText>
            </ListItem>
          </List> 
          <Divider />
          <Typography className={ classes.title } variant='h6'>Game Messages</Typography>
          <List>
            { 
              this.props.messages.map((message, index) => (
                <ListItem key={ message + index }>
                  <ListItemText primary={ message } />
                </ListItem>
              )) 
            }
          </List>
          
        </Drawer>
      </Paper>   
    );
  }
}

export default withStyles(styles)(ActionBar);