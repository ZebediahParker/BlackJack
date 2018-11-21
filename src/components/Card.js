import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

//Get the path to Card_Simple_Suits_Blue 
const cardBack = './images/cardbacks/Card_Simple_Suits_Blue.svg';

//Set styles for Card component
const styles = {
    root: {
        display: 'inline',
    },
    card: {
        width: '10%',
    }
}

class Card extends Component {
    
    getCard = (style) => {
        //If this card needs to be hidden, then use the cardBack image
        if (this.props.hide) {
            return <img className={ style } src={ cardBack } alt='Hidden Card' / >;
        } 
        //Otherwise, use the image for the card that was passed
        else {
            return <img className={ style } src={ this.props.src } alt={ this.props.rank + ' of ' + this.props.suit } />;
        }
    }

    render() {
        const { classes } = this.props;

        /**
         * Uses an img to render a card based on the props passed in
         * Hides the image by using the cardBack image if necessary
         */
        return ( 
            <div className={ classes.root }> 
                {
                    this.getCard(classes.card)
                } 
            </div>
        );
    }
}

export default withStyles(styles)(Card);