import React, {Component} from 'react';
import {
  Grid,
  Navbar,
  Jumbotron,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch('api/v1/users').then(res => res.json()).then(users => this.setState({users}));
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <Grid><h1>Users</h1></Grid>
        </Jumbotron>
        <Grid>
          <ListGroup>
            {this.state.users.map(user =>
              <ListGroupItem>{user.username}</ListGroupItem>)
            }
          </ListGroup>
        </Grid>
      </div>
    );
  }
}

export default App;
