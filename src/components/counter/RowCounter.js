import React from 'react'

import CounterPerson from './CounterPerson'
import {
  Grid
} from 'semantic-ui-react'

class RowCounter extends React.Component {
  constructor() {
    console.log("in constructor....");
    super();
    this.state = {
      count: 0,
      tweets: [],
    };
    this.addTweet = this.addTweet.bind(this);
  }
  addTweet(oTweet) {
    console.log(oTweet);
    console.log(this.state.tweets);
    var aTweets = this.state.tweets;
    var aIDs = aTweets.map((tweet) => {return tweet.tweetID}); // get all current tweet IDs in this row
    console.log(aIDs);
    var sSourceKey;
    var oTransportTweet;
    if (aTweets.length > this.props.maxTweets) {
      console.log("too many tweets! pushing to next row")
      oTransportTweet = aTweets.pop(); // resize to max amount allowed, and transport what we poped
      sSourceKey = this.props.rowSize + "-" + this.props.position; // build the source key for the tweet transporter
      this.props.tweetTransporter(sSourceKey, oTransportTweet); // pass the popped tweet up to handler, and it will be transported to proper row
    }
    else if (!aIDs.includes(oTweet.tweetID)) { // still within tweet amount range for this row AND the tweet is not alrady in this row
      aTweets.push(oTweet); // add the tweet object
      this.setState({tweets: aTweets});
    }
  }
  render () {
    var aPeople = []; // array to build
    var aTweets = this.state.tweets;
    for (var i = 0; i < aTweets.length; i++) {
      aPeople.push(
        <Grid.Column key={i}>
          <CounterPerson size={this.props.rowSize} color={this.props.personColor} user={aTweets[i].user} tweet={aTweets[i].tweet} id={aTweets[i].tweetID}/>
        </Grid.Column>
      );
      console.log(i)
    }
    return (
      <div>
        <CounterPerson size={this.props.rowSize} color={this.props.personColor} user={aTweets[i].user} tweet={aTweets[i].tweet} id={aTweets[i].tweetID}/>
      </div>
    );
  }
}

export default RowCounter;
