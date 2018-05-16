import React, { Component } from 'react';
import './App.css';

class App extends Component{ 
  constructor(){
    super();
    this.state = {
      profiles: [],
    };
  }


componentDidMount(){

fetch(`https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/all.json`)
    .then(characters => characters.json())
    .then(data =>{
      let profiles = data.map((characters) => {
        return(
            <div key={characters.name}> 
              <p>{characters.name}</p>
            </div>
          )
      })
      this.setState({profiles: profiles});
      console.log(this.state.profiles)
    })
}

render(){
  return(
  <div className= "container">
    {this.state.profiles}
  </div>
  )
}
}
export default App;
