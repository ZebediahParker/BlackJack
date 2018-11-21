import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';

//Set styles for ActionBar component
const styles = {
    drawer: {
        display: 'block',
    },
    title: {
        marginLeft: '20px',
        marginTop: '10px',
    },
    stat: {
        marginLeft: '20px',
    },
    action: {
        borderWidth: 0.5,
    }
}

class Dashboard extends Component {

    render() {
        const { classes } = this.props;

        /**
         * Uses Drawer component from @material-ui/core to create side bar on
         * the game screen. Holds the games stats, dealer and player card totals,
         * the player's actions, and messages from the game.
         */
        return (
            <Drawer className={ classes.drawer } variant='permanent' anchor='right'>
                {/* Uses the ExpansionPanel component to make the Game Stats section expandable */}
                {/* Displays current hand totals of both dealer and player */}
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
                <Typography className={ classes.title } variant='h6'>Game Stats</Typography>
                    <List>
                        {/* Lists player stats such as number of games won, number of times busted, and number of busts */}
                        <ListItem>
                            <ListItemText>Player</ListItemText> 
                        </ListItem> 
                        <ListItem>
                            <ListItemText className={ classes.stat }>Wins: { this.props.stats.playerWins }</ListItemText>
                        </ListItem> 
                        <ListItem>
                            <ListItemText className={ classes.stat }>Busts: { this.props.stats.playerBusts }</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText className={ classes.stat }>Black Jacks: { this.props.stats.playerBlackJacks }</ListItemText>
                        </ListItem> 
                        {/* Lists dealer stats such as number of games won, number of times busted, and number of busts */}
                        <ListItem>
                            <ListItemText>Dealer</ListItemText>
                        </ListItem> 
                        <ListItem>
                            <ListItemText className={ classes.stat }>Wins: { this.props.stats.dealerWins }</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText className={ classes.stat }>Busts: { this.props.stats.dealerBusts }</ListItemText>
                        </ListItem> 
                        <ListItem>
                            <ListItemText className={ classes.stat }>Black Jacks: { this.props.stats.dealerBlackJacks }</ListItemText>
                        </ListItem> 
                        {/* Shows number of times dealer and player tied */}
                        <ListItem>
                            <ListItemText>Ties: { this.props.stats.ties }</ListItemText>
                        </ListItem> 
                    </List> 
                <Divider />
                {/* Displays messages about actions taken in the game and win/lose messages */}
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

export default withStyles(styles)(Dashboard);