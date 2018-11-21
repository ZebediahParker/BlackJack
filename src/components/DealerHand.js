import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

//Set styles for DealerHand component
const styles = {
    root: {
        display: 'block',
    },
}

class DealerHand extends Component {
    render() {
        const { classes } = this.props;
        const hideCard = this.props.hideCard;

        /**
         * Uses props passed from Game component to build the dealer's hand using the Card component
         * If it is the first card and it needs to be hidden then passes true to the Card component, passes false otherwise
         */
        return ( 
            <div className={ classes.root }> 
                { 
                    this.props.hand.map(function (card, i) {
                        return <Card src={ card.src } rank={ card.rank } suit={ card.suit } hide={ i === 0 && hideCard } key={ i } />;
                    })
                } 
            </div>
        );
    }
}

export default withStyles(styles)(DealerHand);