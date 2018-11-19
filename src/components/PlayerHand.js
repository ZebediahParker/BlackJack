import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

const styles = {
    root: {
        display: 'block',
    },
}

class PlayerHand extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={ classes.root }>
                { 
                    this.props.hand.map(function(card, i) {
                        return <Card src={ card.src } rank={ card.rank } suit={ card.suit } hide={ false } key={ i }/>;
                    })
                }
            </div>
        );
    }
}

export default withStyles(styles)(PlayerHand);