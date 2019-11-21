import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';
class CustomWrapper extends Component {
  constructor() {
    super();
    this.fetchPhotos.bind(this);
  }

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

  componentDidMount() {
    this.fetchPhotos();
  }

  fetchPhotos = () => {};

  render() {
    return (
      <div className="albumWrapper">
        <Card.Group
          itemsPerRow={this.state.showCardCnt}
          className={this.props.className}
        >
          {this.state.cards.map((e, i) => {
            return (
              <Card key={i} color={e.cardColor}>
                <Image src={e.cardSrc} />
                <Card.Content>
                  <Card.Header>제목</Card.Header>
                  <Card.Meta>내용</Card.Meta>
                </Card.Content>
                <Card.Content extra>{e.cardColor}</Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}

const AlbumWrapper = styled(CustomWrapper)``;

export default AlbumWrapper;
