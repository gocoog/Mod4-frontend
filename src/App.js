import React, { Component } from 'react';
import './App.css';
import ProfileContainer from './containers/ProfileContainer'
import Header from './components/Header'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import NewElectionForm from './components/NewElectionForm'
import './fonts/Blue_Spirits.otf'
import Results from './components/Results'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class App extends Component {
  state = {
    isLoggedIn: false
  }

  componentDidMount(){
    if(localStorage.length > 0){
      this.setState({ isLoggedIn: true })
    }
  }

  handleLogin = () => {
    if(localStorage.length > 0){
      this.setState({ isLoggedIn: true })
    }
  }

  handleElectionSubmit = (newElection) => {
    console.log(newElection)
    // this.setState({
    //   elections: [...this.state.elections, newElection], addingElection: false
    // })
  }

  render(){
    return (
      <div className="parent">
        <section className="back">
        <BrowserRouter>
        <h1 className="title">i,Vote</h1>
        <Header isLoggedIn={this.state.isLoggedIn} />
          <Switch>
            <Route exact path="/" component={() => {
              if(localStorage.length > 0){
                return <ProfileContainer />
              }else{
                return <Redirect to="/login" />
              }
            }} />
            <Route exact path='/login' component={() => {
              return <Login handleLogin={this.handleLogin} />
              }}
               />
            <Route exact path='/signup' component={() => {
              return <Signup handleLogin={this.handleLogin} />
            }} />

            <Route exact path="/new_election_form">
              <NewElectionForm handleElectionSubmit={this.handleElectionSubmit} />
            </Route>

            <Route exact path="/results">
              <Results  />
            </Route>

            <Route path="/logout" component={() => {
              localStorage.clear()
              this.setState({ isLoggedIn: false })
              return <Redirect to="/login" />
            }} />

            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
        </section>
      </div>
    );
  }
}

export default App;
