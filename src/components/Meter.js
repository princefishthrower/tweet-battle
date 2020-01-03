import React from 'react';
import io from 'socket.io-client'; // client side of socket

// custom components
import CounterContainer from './counter/CounterContainer';

// util functions
import { blendColors } from '../utils/colorHelpers';

import {
  Container,
  Input,
  Button,
  Dropdown,
  Grid
} from 'semantic-ui-react'

// third party libraries
var shortid = require('shortid');
const socket = io('http://localhost:8000'); // make sure it is from where the server is serving
const red = "#f45642";
const green = "#41f44a";
const aItems = [{sTitle: "World Happiness Meter - ':)' vs ':('", sTracker1: ":)", sTracker2: ":("},
{sTitle: "US Politics Meter - 'obama' vs 'trump'", sTracker1: "obama", sTracker2: "trump"},
{sTitle: "World Happiness Meter Alternative - 'happy' vs 'sad'", sTracker1: "happy", sTracker2: "sad"}];
// const initialChartState = {
//   labels: ['Scatter'],
//   datasets: [
//     {
//       label: 'Percent word1 vs word2',
//       fill: false,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: []
//     }
//   ],
//   animation: false
// };

class Meter extends React.Component {
  constructor() {
    super();
    this.state = {
      bInitialTrackersLoaded: false,
      sTracker1: '',
      sTracker2: '',
      sDesiredTracker1: '',
      sDesiredTracker2: '',
      iTracker1Count: 0,
      sTracker1Tweet: '',
      iTracker2Count: 0,
      sTracker2Tweet: '',
      fPercent: 0,
      sMeterColor: green,
      sMarginLeftPercent: '100%',
    }
    //      chartData: initialChartState
    this.calculatePercent = this.calculatePercent.bind(this);
    this.tracker1Count = this.tracker1Count.bind(this);
    this.tracker2Count = this.tracker2Count.bind(this);
    // this.addPointToChart = this.addPointToChart.bind(this);
    this.newTrackerValues = this.newTrackerValues.bind(this);
    this.setInitialTrackers = this.setInitialTrackers.bind(this);
    this.handleChangeTracker1 = this.handleChangeTracker1.bind(this);
    this.handleChangeTracker2 = this.handleChangeTracker2.bind(this);

    this.newTrackerValuesFromDropDown = this.newTrackerValuesFromDropDown.bind(this);

    // set the intial trackers --> a ':)' and a ':('
    socket.on('initialTrackers', this.setInitialTrackers)
    // if a :) is found, add to the number
    socket.on('tracker1', this.tracker1Count);
    // if a :( is found, add to the number
    socket.on('tracker2', this.tracker2Count);

  }
  setInitialTrackers(msg) {
    console.log('initializing trackers');
    socket.emit('initializedTrackers'); // tell the server we finally got the initial trackers, this will end the interval on the server
    console.log(msg);
    this.setState({bInitialTrackersLoaded: true, sTracker1: msg.tracker1, sTracker2: msg.tracker2, sDesiredTracker1: msg.tracker1, sDesiredTracker2: msg.tracker2});
    setInterval(this.addPointToChart, 1000); // add a point to the chart every second now that the trackers loaded
  }
  tracker1Count(oMessage) {
    const oJavascriptMessage = JSON.parse(oMessage);
    this.setState({iTracker1Count: this.state.iTracker1Count + 1, sTracker1Tweet: oJavascriptMessage.text});
    this.counterContainer.tweetTransporter("queue-left",{user: oJavascriptMessage.name, tweet: oJavascriptMessage.text, screen_name: oJavascriptMessage.screen_name, tweetID: shortid.generate()}); // a user, tweet, and ID makes a fully qualified tweet object
    this.calculatePercent(this.state.iTracker1Count, this.state.iTracker2Count);
  }
  tracker2Count(oMessage) {
    const oJavascriptMessage = JSON.parse(oMessage);
    this.setState({iTracker2Count: this.state.iTracker2Count + 1, sTracker2Tweet: oJavascriptMessage.text});
    this.counterContainer.tweetTransporter("queue-right",{user: oJavascriptMessage.name, tweet: oJavascriptMessage.text, screen_name: oJavascriptMessage.screen_name,  tweetID: shortid.generate()})
    this.calculatePercent(this.state.iTracker1Count, this.state.iTracker2Count);
  }
  clearPeople() {
    
  }
  // addPointToChart() {
  //   var chartData = this.state.chartData;
  //   var oValues = Object.values(chartData);
  //   var oValuesValues = Object.values(oValues);
  //   var aData = oValuesValues[1][0].data; // my god...
  //   var iNextX;
  //   if (aData.length !== 0) {
  //     iNextX = aData[aData.length - 1].x; // last x value in array, plus 1
  //     iNextX = iNextX + 1;
  //   } else {
  //     iNextX = 1;
  //   }
  //   aData.push({x: iNextX, y: this.state.fPercent}); // add the percentage data point
	// 	var oldDataSet = oValues[1];
	// 	var newDataSet = {
	// 		...oldDataSet
	// 	}; // copy of old data set...
	// 	newDataSet.data = aData; // except for our new data
	// 	var newChartState = {
	// 		...initialChartState,
	// 		datasets: [newDataSet]
	// 	};
  //   this.setState({chartData: newChartState});
  // }
  newTrackerValues() {
    if (this.state.sTracker1 !== '' && this.state.sTracker2 !== '') {
      this.setState({sTracker1: this.state.sDesiredTracker1,
                     sTracker2: this.state.sDesiredTracker2,
                     iTracker1Count: 0,
                     sTracker1Tweet: '',
                     iTracker2Count: 0,
                     sTracker2Tweet: '',
                     fPercent: 0,
                     sMeterColor: green,
                     sMarginLeftPercent: '100%'}); // reset a lot of parts of state
      socket.emit('updateTrackers', {tracker1: this.state.sDesiredTracker1, tracker2: this.state.sDesiredTracker2});
    }
    // TODO: warning popup when values are not filled
  }
  newTrackerValuesFromDropDown(sDesiredTracker1, sDesiredTracker2) {
    this.setState({sTracker1: sDesiredTracker1,
                   sTracker2: sDesiredTracker2,
                   iTracker1Count: 0,
                   sTracker1Tweet: '',
                   iTracker2Count: 0,
                   sTracker2Tweet: '',
                   fPercent: 0,
                   sMeterColor: green,
                   sMarginLeftPercent: '100%'}); // reset a lot of parts of state
    socket.emit('updateTrackers', {tracker1: sDesiredTracker1, tracker2: sDesiredTracker2});
  }
  handleChangeTracker1(event) {
    this.setState({sDesiredTracker1: event.target.value});
  }
  handleChangeTracker2(event) {
    this.setState({sDesiredTracker2: event.target.value});
  }
  calculatePercent(iTracker1Count, iTracker2Count) {
    var fPercent = iTracker1Count / (iTracker1Count + iTracker2Count) * 100.00;
    var sColor = blendColors(red, green, fPercent / 100);
    var sMarginLeftPercent = (50 - Math.round(fPercent)).toString() + "%";
    this.setState({fPercent: Math.round(fPercent), sMeterColor: sColor, sMarginLeftPercent: sMarginLeftPercent});
  }
  render() {
    let aDropdownItems = [];
    aItems.forEach((oItem, iIndex) => {
      aDropdownItems.push(<Dropdown.Item text={oItem.sTitle} key={iIndex} onClick={() => this.newTrackerValuesFromDropDown(oItem.sTracker1, oItem.sTracker2)}/>)
    });
    //          <Chart chartData={this.state.chartData}/>
    return (
      <div>
        { this.state.bInitialTrackersLoaded &&
          <div>
            <Container text style={{ marginTop: '7em' }} textAlign="center">
              <h2>Tweets Worldwide: '<code>{this.state.sTracker1}</code>' vs. '<code>{this.state.sTracker2}</code>'</h2>
                <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                  
                  <aside className="aside aside-1">{this.state.sTracker1}<br/><br/>{this.state.iTracker1Count}</aside>
                  </Grid.Column>        
                  <Grid.Column>
                    <article className="main" style={{background: this.state.sMeterColor}}>
                      <p><span id="percent">{this.state.fPercent}</span>%</p>
                      <br/>
                      <div style={{marginLeft: this.state.sMarginLeftPercent}}></div>
                    </article>
                  </Grid.Column>
                  <Grid.Column>
                    <aside className="aside aside-2">{this.state.sTracker2}<br/><br/>{this.state.iTracker2Count}</aside>
                  </Grid.Column>
                </Grid.Row>
                  
                </Grid>
  
                  <p>Or, enter your own two words to track!</p>
                  <Input value={this.state.sDesiredTracker1} onChange={this.handleChangeTracker1}></Input>
                  <Input value={this.state.sDesiredTracker2} onChange={this.handleChangeTracker2}></Input>
                  <Button onClick={this.newTrackerValues}>GO!</Button>
                  <p>Or, select one of the common favorites!</p>
                  <Dropdown text="Select..." fluid search selection options={aDropdownItems}/>
            </Container>
          </div> }

          <CounterContainer ref={instance => { this.counterContainer = instance; }}/>
    </div>
    );
  }

}

Meter.defaultProps = {
};

export default Meter;
