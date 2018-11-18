import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuItem: {
        display: 'block',
        align: 'center',
        margin: theme.spacing.unit,
    }
});

class Home extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                <div>
                    <Typography className={ classes.menuItem } variant='title'>Black Jack</Typography> 
                    <Button className={ classes.menuItem } size='large' onClick={ () => this.props.changePage('Game') }>Start Game</Button>
                    <Button className={ classes.menuItem } size='large' onClick={ () => this.props.changePage('Dashboard') }>Stats</Button>
                    <Button className={ classes.menuItem } size='large' onClick={ () => this.props.changePage('Options') }>Options</Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);