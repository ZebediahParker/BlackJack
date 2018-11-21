import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

//Sets styles for Home component
const styles = {
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        alignText: 'center',
    },
    menuItem: {
        display: 'block',
        width: '100%',
        align: 'center',
    }
}

class Home extends Component {

    render() {
        const { classes } = this.props;

        /**
         * Displays Home page with Black Jack text and Start Game button centered
         * Uses Home_Background.png for the background image featuring all four suits centered on page
         */
        return (
            <div className={ classes.root }>
                <div>
                    <Typography className={ classes.menuItem } variant='h3' align='center'>Black Jack</Typography> 
                    <Button className={ classes.menuItem } size='large' variant='outlined' onClick={ () => this.props.changePage('Game') }>Start Game</Button>
                    <Button className={ classes.menuItem } size='large' variant='outlined' onClick={ () => this.props.changePage('Rules') }>Rules</Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);