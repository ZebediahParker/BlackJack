import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

const styles = {
    root: {
        display: 'inline',
    },
    card: {
        width: '50%',
    }
}

class PlayerHand extends Component {

    render() {

        return (
            <div >
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