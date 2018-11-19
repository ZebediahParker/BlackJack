import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        display: 'inline',
    },
    card: {
        width: '10%',
    }
}

class Card extends Component {

    state ={
        cardBack: 'Simple Suits',
    }

    getCard = (style) => {
        if(this.props.hide) {
            return <img className = { style } src={ './images/cardbacks/Card_Simple_Suits_Blue.svg' } alt='Hidden Card' />
        }

        else {
            return <img className = { style } src={ this.props.src } alt={ this.props.rank + " of " + this.props.suit }/>;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className = { classes.root }>
                { this.getCard(classes.card) }
            </div>
        );
    }
}

export default withStyles(styles)(Card);