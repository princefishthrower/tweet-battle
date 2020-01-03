import React from 'react'

// other third party
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

import Meter from './components/Meter';
import About from './components/About';

// requires
const logo = require("./images/beer.png")

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Menu fixed='top' inverted>
              <Container>
                <Menu.Item as='a' header>
                  <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                  Tweet Battle
                </Menu.Item>
                <Menu.Item as='a'><Link to="/about">About</Link></Menu.Item>
              </Container>
            </Menu>

            <Route exact path="/" render={(props) => (
              <Meter {...props}/>
            )}/> 
            <Route exact path="/about" render={(props) => (
              <About {...props}/>
            )}/> 

            <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
              <Container textAlign='center'>
                <Divider inverted section />
                <Image centered size='mini' src={logo} />
                <List horizontal inverted divided link>
                  <List.Item as='a' href='#'>
                    Site Map
                  </List.Item>
                  <List.Item as='a' href='#'>
                    Contact Us
                  </List.Item>
                  <List.Item as='a' href='#'>
                    Terms and Conditions
                  </List.Item>
                  <List.Item as='a' href='#'>
                    Privacy Policy
                  </List.Item>
                </List>
              </Container>
            </Segment>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;












// import React from 'react';
// 
// import Header from './components/Header'
// import Meter from './components/Meter'
// import TextContent from './components/TextContent'
// // import Chart from './components/Chart'
// import Footer from './components/Footer'
// 
// // require('styles/App.css');
// 
// class App extends React.Component {
//   render() {
//     return (
//       <div className='wrapper'>
//         <Header/>
//         <Meter/>
//         <TextContent/>
//         <Footer/>
//       </div>
//     );
//   }
// }
// 
// App.defaultProps = {
// };
// 
// export default App;
