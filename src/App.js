import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatScreen'

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentScreen: 'WhatIsYourUsernameScreen',
      currentUsername: ''
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }
  onUsernameSubmitted(username){
    fetch('http://localhost:3001/users',{
      method: 'post',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify({username}),
    })
    .then(response=>{
      console.log('success');
      this.setState({
        currentScreen: 'ChatScreen',
        currentUsername: username
      });
    })
    .catch(error=>{
      console.error(error);
    })
  }

  render() {
    if(this.state.currentScreen === 'WhatIsYourUsernameScreen'){
      return <UsernameForm onSubmit={this.onUsernameSubmitted}/>
    }else if(this.state.currentScreen === 'ChatScreen'){
      return <ChatScreen currentUsername={this.state.currentUsername}/>
    }
    
  }
}

export default App
