import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

const styles = {
    root: {
        display: 'block',
    },
}

class DealerHand extends Component {
    render() {
        const { classes } = this.props;
        const hideCard = !this.props.hideCard;

        return (
            <div className={ classes.root }>
                {   
                    this.props.hand.map(function(card, i) {   
                        console.log(hideCard);
                        return <Card src={ card.src } rank={ card.rank } suit={ card.suit } hide={ i === 0 && hideCard } key={ i }/>;
                    })
                }
            </div>
        );
    }
}

export default withStyles(styles)(DealerHand);