import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import './App.css';
import firebase from 'firebase';
import LogIn from './components/login.js';
import Search from './components/search.js';
import Trending from './components/trending.js';
import PlaylistList from './components/playlist-list.js';
import AddBox from './components/addbox.js';
import Playlist from './components/playlist.js';
import UserName from './components/user-name.js';


class App extends Component {

  constructor(props){
    super(props)

    this.state = {location: 'Trending', user: false, username: true}
  }

  componentWillMount(){

    var config = {
      apiKey: "AIzaSyBjNJr-n3rVt06UuiaXbCDw8zCpV9nH50A",
      authDomain: "serialist-beta.firebaseapp.com",
      databaseURL: "https://serialist-beta.firebaseio.com",
      projectId: "serialist-beta",
      storageBucket: "serialist-beta.appspot.com",
      messagingSenderId: "1073852961453"
    };
    firebase.initializeApp(config);

    var fire_provider = new firebase.auth.GoogleAuthProvider()
    var database = firebase.database()
    this.setState({firebase: firebase, fire_provider: fire_provider, database: database}) 

  }






  //-----------------------------------
  //Logging in


  login(){

    var userInfoToState = (user, token) => {
      this.setState({user: user, token: token})
    } 

    this.state.firebase.auth().signInWithPopup(this.state.fire_provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // add to state
      userInfoToState(user, token)

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  addUserName(userId, username){
    this.state.database.ref('usernames/' + userId).set({
            username: username
        }, () => {
            alert('Success!')
        })
  }

  hasUserNameCheck(userId){
    var existsRef = this.state.database.ref('usernames/' + userId).child()
    existsRef.once('value', (username) => {
      if(username.val() !== null){
        this.setState({username: username.val()})
      }
    })
  }




  //-----------------------------------
  //Simple Navigation (Non-react-router)

  

  updateLocation(location){
    this.setState({location: location})
  }




  //render

  render() {
    return (
      <Router>
        <div className='main'>
          <div className='navbar navbar-defualt navbar-toggleable-sm'>
            <Link className='navbar-brand' to="/">serialist.io</Link>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link className="nav-link" to="/">Trending</Link>
                </li>

                {!this.state.user &&
                <li className='nav-item'>
                  <Link className="nav-link" to="/login">Log In</Link>
                </li>
                }

                {this.state.user && !this.state.username &&
                  <Redirect to="/username" />
                }

                {this.state.user && this.state.username &&
                <ul className='navbar-nav'>
                  <Redirect to="/yourplaylists" />
                  <li className='nav-item'>
                    <Link className="nav-link" to="/yourplaylists">Your Playlists</Link>
                  </li>
                  <li className='nav-item'>
                    <Link className="nav-link" to="/search">New Playlist</Link>
                  </li>
                  <li className='pt-1 ml-3'>
                    <span>Signed in as: {this.state.user.email}</span>
                  </li>
                </ul>
                }
              </ul>
            </div>
            <button className="navbar-toggler navbar-toggler-right inverse" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <AddBox />

          <Route exact path="/" component={() => <Trending database={this.state.database} user={this.state.user} />} />
          <Route path="/search" component={() => <Search database={this.state.database} user={this.state.user} /> }/>
          <Route path="/username" component={() => <UserName database={this.state.database} userId={this.state.user.uid} /> }/>
          <Route path="/playlist/:key" component={(props) => <Playlist {...props} database={this.state.database} /> }/>
          <Route path="/login" component={() => <LogIn login={() => this.login()} /> }/>
          <Route path="/yourplaylists" component={() => <PlaylistList database={this.state.database} userId={this.state.user.uid} /> } />
        </div>
      </Router>
    );
  }
}

export default App;
