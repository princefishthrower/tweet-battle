import React from 'react';
import {
  Container,
  Header
} from 'semantic-ui-react'

let beer = require('../images/beer.png');

class TextContent extends React.Component {
  render() {
    return (
      <div>
      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1'>About Tweet Battle</Header>
          <p>This app uses Twit.js and socket.io to live stream tweets from around the world,<br/> where 
            This was originally what I called 'the world happiness meter', where a ':)' would +1 to the happiness counter and <br/> ':(' would +1 to the sadness counter.</p>
          <p>I quickly realized this concept could be extended to a large variety of tweets!</p>
          <p>Cheers. <img src={beer} alt="Mug of beer."/></p>
      </Container>
    </div>
    );
  }
}

TextContent.defaultProps = {
};

export default TextContent;
