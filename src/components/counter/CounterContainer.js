import React from 'react'

import RowCounter from './RowCounter'
import CounterPerson from './CounterPerson'


import {
  Grid
} from 'semantic-ui-react'

class CounterContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      aTweetsLeft: [],
      aTweetsRight: []
    }
    this.tweetTransporter = this.tweetTransporter.bind(this);
  }
  tweetTransporter(sSourceKey, oTweet) {
    let aTweetsLeft = this.state.aTweetsLeft;
    let aTweetsRight = this.state.aTweetsRight;
    console.log(sSourceKey);
    switch (sSourceKey) {
      case "queue-left":
        aTweetsLeft.push({personColor: "blue", ...oTweet});
        this.setState({aTweetsLeft: aTweetsLeft});
        break;
      case "queue-right":
        aTweetsRight.push({personColor: "red", ...oTweet});
        this.setState({aTweetsRight: aTweetsRight});
        break;
    }
    
    //   case "small-left":
    //     // small row to medium row
    //     this.mediumLeft.addTweet(oTweet);
    //     break;
    //   case "medium-left":
    //     // medium row to
    //     this.largeLeft.addTweet(oTweet);
    //     break;
    //   case "small-right":
    //     // small row to medium row
    //     this.mediumLeft.addTweet(oTweet);
    //     break;
    //   case "medium-right":
    //     this.largeLeft.addTweet(oTweet);
    //     break;
    //   default:
    //     console.log(sSourceKey);
    //     console.log("end of UI loop for this tweet... er kommt nie wieder");
  }
  render () {
    var aTweetsLeft = this.state.aTweetsLeft;
    let aPeopleLeft = [];
    let aLeftRows = [];
    var aTweetsRight = this.state.aTweetsRight;
    let aPeopleRight = [];
    let aRightRows = [];
    for (var i = 0; i < aTweetsLeft.length; i++) {
      aPeopleLeft.push(
        <Grid.Column style={{"padding":"2rem"}}>
          <CounterPerson size={this.props.rowSize} personColor={aTweetsLeft[i].personColor} user={aTweetsLeft[i].user} tweet={aTweetsLeft[i].tweet} screen_name={aTweetsLeft[i].screen_name} id={aTweetsLeft[i].tweetID}/>
        </Grid.Column>
        );
    }
    for (var i = 0; i < aTweetsRight.length; i++) {
      aPeopleRight.push(
        <Grid.Column style={{"padding":"2rem"}}>
          <CounterPerson size={this.props.rowSize} personColor={aTweetsRight[i].personColor} user={aTweetsRight[i].user} tweet={aTweetsRight[i].tweet} screen_name={aTweetsRight[i].screen_name}  id={aTweetsRight[i].tweetID}/>
        </Grid.Column>
        );
    }
    var quotient = Math.floor(aPeopleLeft.length / 16);
    var remainder = aPeopleLeft.length % 16;
    if (remainder > 0) {
      quotient = quotient + 1;
    }
    for (var i = 0; i < quotient; i++) {
      aLeftRows.push(
        <Grid.Row columns={16}>
          {aPeopleLeft.slice(16*i,(16*(i+1))+1)}
        </Grid.Row>  
      );
    }
    var quotient = Math.floor(aPeopleRight.length / 16);
    var remainder = aPeopleRight.length % 16;
    if (remainder > 0) {
      quotient = quotient + 1;
    }
    for (var i = 0; i < quotient; i++) {
      aRightRows.push(
        <Grid.Row columns={16}>
          {aPeopleRight.slice(16*i,(16*(i+1))+1)}
        </Grid.Row>  
      );
    }
    return (
      <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Grid>
            {aLeftRows}
        </Grid>
      </Grid.Column>
      <Grid.Column>
          <Grid>
            {aRightRows}
          </Grid>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    );
  }
}

export default CounterContainer;
