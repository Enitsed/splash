import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

class CustomWrapper extends Component {
  state = {
    showCardCnt: 4,
    cards: [
      {
        cardColor: 'olive',
        cardSrc: 'http://pngimg.com/uploads/almond/almond_PNG72.png',
      },
      {
        cardColor: 'olive',
        cardSrc: 'http://pngimg.com/uploads/almond/almond_PNG72.png',
      },
    ],
  };

  render() {
    return (
      <Card.Group
        itemsPerRow={this.state.showCardCnt}
        className={this.props.className}
      >
        {this.state.cards.map((e, i) => {
          return <Card key={i} color={e.cardColor} image={e.cardSrc} />;
        })}
      </Card.Group>
    );
  }
}

const AlbumWrapper = styled(CustomWrapper)``;

export default AlbumWrapper;
