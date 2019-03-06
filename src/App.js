import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { CURRENT_SERVER } from './CurrentServer';

import WelcomePage from "./container/welcome-page";
import UserPage from "./container/user-page";

//CSS
import './App.css';
import {message} from "antd";


class App extends Component {

  state = {
      loggedIn: false,
      regError: false,
      user: null
  };

  registerHandler = (firstName, lastName, email, password, username) => {
      axios.post(CURRENT_SERVER + "register",
          {"firstName":firstName,
                "lastName":lastName,
                "email":email,
                "password":password,
                "username":username
          })
          .then(res=>{
              console.log(res);
              message.success('Registration Successful.');
          })
          .catch(e=>{
              console.log(e);
              message.error('Registration Unsuccessful.');
              this.setState({regError: true});
              console.log("reg fail")
          })
          .then(resp=>this.loginHandler(username,password))
  };

  loginHandler = (username, password) => {
      console.log(username);
      console.log(password);
      axios.post(CURRENT_SERVER + "login", {"username":username, "password":password})
          .then(resp=> {
              localStorage.setItem('token', resp["headers"]["authorization"]);
              this.setState({loggedIn: true})
          })
          .catch(e=> {
                console.log(e);
                message.error('Login Unsuccessful.')
          })
          .then(()=>this.fetchUser())
  };

  logoutHandler = () => {
      localStorage.setItem("token", null);
      this.setState({loggedIn:false, user:null});
      // return <Redirect to="/login"/>
  };

  fetchUser = () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token != null){
          axios.get(CURRENT_SERVER, {headers:{Authorization:token}})
              .then(resp=>{
                  console.log(resp["data"]);
                  this.setState({user:resp["data"]});
                  console.log(this.state.user)
              })
              .catch(e=>console.log(e))
      }
  };

  UserWelcomePage = () => {
      return(
          <WelcomePage
              onLogin={(username, password)=> this.loginHandler(username, password)}
              onRegister={(firstName, lastName, email, password, username) =>
                  this.registerHandler(firstName, lastName, email, password, username)}
              regError={this.state.regError}
          />
      )
  };

  UserLandingPage = () => {
      // this.fetchUser();
      if (this.state.user)
      return(
          <UserPage
              onLogout={this.logoutHandler}
              firstName={this.state.user.firstName}
              email={this.state.user.email}
          />
      );
      else return this.UserWelcomePage()
  };

  CurrentPage = () => {
      const token = localStorage.getItem('token');
      if (this.state.loggedIn) {
          if (token)
              return this.UserLandingPage();
          else return this.UserWelcomePage()
      }
      else if (token){
          this.fetchUser();
          this.setState({loggedIn:true});
          return null;
      }
      else return this.UserWelcomePage();
  };

  render() {
      return (
          <div className="App">
              <Router>
                  <Route path="/" exact component={this.CurrentPage}/>
              </Router>
      </div>
      );
  }
}

export default App;
