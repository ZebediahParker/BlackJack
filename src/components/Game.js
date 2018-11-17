import React, { Component } from 'react';
const background = 'images/background.jpg';

const styles = {
    root: {
        height: '100%',
        backgroundImage: `url(${ background })`,
        backgroundSize: 'cover',
    }
};

class Game extends Component {
  render() {
    return (
      <div style={ styles.root }>

      </div>
    );
  }
}

export default Game;
