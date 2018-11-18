import React, { Component } from 'react';

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
        return (
            <div >
                { 
                    this.props.hand.map(function(card, i) {
                        return (
                            <div style = { styles.root } key={ i }>
                                <img style = { styles.card } src={ card.src } alt={ card.rank + " of " + card.suit }/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default DealerHand;