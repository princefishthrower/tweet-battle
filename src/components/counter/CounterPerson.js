import React from 'react';
import Popover from 'react-simple-popover';
import { ShakeSlow } from 'reshake';
import {
  Popup
} from 'semantic-ui-react';

let personBlue = require("../../images/person-blue.svg");
let personRed = require("../../images/person-red.svg");



class CounterPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleMouseEnter(e) {
    this.setState({open: true});
  }
  handleMouseLeave(e) {
    this.setState({open: false});
    console.log('closing popup')
  }
  handleClose(e) {
    this.setState({open: false});
  }
  render () {
    let oImage;
    if (this.props.personColor === "blue") {
      oImage = <img ref={(node) => { this.target = node }} style={{"width": "10px"}} src={personBlue} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} alt="A blue stick figure person."/>
    } else {
      oImage = <img ref={(node) => { this.target = node }} style={{"width": "10px"}} src={personRed} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} alt="A red stick figure person."/>
    }
    const oContent = (
      <div>
        <h2 className="tweetText"><span className="hugeTweetQuote">"</span>{this.props.tweet}<span className="hugeTweetQuote">"</span></h2>
      </div>
    );
    const oHeader = (
      <div>
        <h1 className="tweetTitle">{this.props.user}</h1>
        <br/>
        <sup>@{this.props.screen_name}</sup>
      </div>
    );
    
    return (
      <div>

          <Popup trigger={oImage} header={oHeader} content={oContent} on='hover'/>
      </div>
    );
  }
}

export default CounterPerson;
