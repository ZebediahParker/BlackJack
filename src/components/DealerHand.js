import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from './Card';

const styles = {
    root: {
        display: 'inline',
    },
    card: {
        width: '10%',
    }
}

class DealerHand extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div >
                { 
                    this.props.hand.map(function(card, i) {
                        
                        if(i === 0) {
                            return <Card src={ card.src } rank={ card.rank } suit={ card.suit } hide={ true }/>;
                        }
                        
                        else {
                            return <Card src={ card.src } rank={ card.rank } suit={ card.suit } hide={ false }/>;
                        }
                    })
                }
            </div>
        );
    }
}

export default withStyles(styles)(DealerHand);