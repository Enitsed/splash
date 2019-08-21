import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import styled from 'styled-components';

class CustomContainer extends Component {
  render() {
    return (
      <Card.Group itemsPerRow={4} className={this.props.className}>
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
        <Card
          color="olive"
          image="http://pngimg.com/uploads/almond/almond_PNG72.png"
        />
      </Card.Group>
    );
  }
}

const AlbumContainer = styled(CustomContainer)`
  min-width: 25vw;
  max-width: 75vw;
  margin-top: 15px !important;
`;

export default AlbumContainer;
