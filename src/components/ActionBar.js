import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
      root: {
        width: '90%',
        position: 'absolute',
        left: '10%',
        bottom: 5,
        justifyContent:'center',
      },
      button: {
        width: '15%',
        margin: 2,
      }
}
class ActionBar extends Component {

  /** 
   * Displays actions that the player may take, 
   * Deal Card and Hold are disabled if the player 
   * has held or game is over 
   */
  render() {
    const { classes } = this.props;
    return (
        <div className={ classes.root }>
          <Button className={ classes.button } variant='extendedFab' disabled={ this.props.playerHeld } onClick={ () => this.props.hit('player') }>Deal</Button>
          <Button className={ classes.button } variant='extendedFab' disabled={ this.props.playerHeld } onClick={ () => this.props.hold('player') }>Hold</Button>
          <Button className={ classes.button } variant='extendedFab' onClick={ () => this.props.changePage('Game') }>Restart</Button>
          <Button className={ classes.button } variant='extendedFab' onClick={ () => this.props.changePage('Home') }>Return Home</Button>
        </div>
    );
  }

}
export default withStyles(styles)(ActionBar);
