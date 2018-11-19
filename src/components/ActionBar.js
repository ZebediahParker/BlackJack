import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, List, ListItem, ListItemText, Paper } from '@material-ui/core';

const styles = {
  root: {
    display: 'block',
    width: '20%',
  },
  drawer: {
    display: 'block',
    width: '100%',
  },
}

class ActionBar extends Component {
  
  render() {
    const { classes } = this.props;

    return (
      <Paper className={ classes.root }>
        <Drawer className={ classes.drawer } variant='permanent' anchor='right'>
          <List>
            <ListItem button onClick={ () => this.props.hit() }>
              <ListItemText>Deal Card</ListItemText>
            </ListItem>
            <ListItem button onClick={ () => this.props.hold('player') }>
              <ListItemText>Hold</ListItemText>
            </ListItem>
            <ListItem button onClick={ () => this.props.changePage('Game')}>
              <ListItemText>Reset Game</ListItemText>
            </ListItem>
          </List> 
          <Divider />
          <List>
            <ListItem>
              <ListItemText>Player: { this.props.playerTotal }</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Dealer: { this.props.dealerTotal }</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <List>
            { 
              this.props.messages.map((message) => (
                <ListItem key={ message }>
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