import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  drawer: {
    display: 'block',
  },
  title: {
    marginLeft: '20px',
    marginTop: '10px',
  },
  name: {
    marginLeft: '-20px',
  },
  action: {
    borderWidth: 0.5,
  }
}

class ActionBar extends Component {

  render() {
    const { classes } = this.props;

    return (
        <Drawer className={ classes.drawer } variant='permanent' anchor='right'>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
              <Typography variant='h6'>Game Stats</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                <ListItem>
                  <ListItemText className={ classes.name }>Player</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Wins: { this.props.stats.playerWins }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Busts: { this.props.stats.playerBusts }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Black Jacks: { this.props.stats.playerBlackJacks }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText className={ classes.name }>Dealer</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Wins: { this.props.stats.dealerWins }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Busts: { this.props.stats.dealerBusts }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Black Jacks: { this.props.stats.dealerBlackJacks }</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText className={ classes.name }>Ties: { this.props.stats.ties }</ListItemText>
                </ListItem>
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Divider />
          <Typography className={ classes.title } variant='h6'>Current Totals</Typography>
          <List>
            <ListItem>
              <ListItemText>Dealer: { this.props.dealerTotal }</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Player: { this.props.playerTotal }</ListItemText>
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
    );
  }
}

export default withStyles(styles)(ActionBar);