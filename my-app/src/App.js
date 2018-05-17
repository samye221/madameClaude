import React, { Component } from 'react';
// import Form from './Components/buttonFilterFemale'
import './App.css';

class App extends Component{ 
  constructor(){
    super();
    this.state = {
      profiles: [],
      filters: {
        gender: 'female', // 'male', 'female', undefined (tous)
        skinColor: 'white'
      }
    };
  }


  componentDidMount(){
    fetch(`https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/all.json`)
      .then(data => data.json())
      .then(profiles => {
        this.setState({ profiles: profiles })
      })
  }

  render(){
    const profiles = this.state.profiles
      .filter(p => p.gender === this.state.filters.gender)
      .map(profile => {
        return (
          <div key={profile.name}> 
            <p>{profile.name}</p>
          </div>
        )
      })

    return (
      <div className= "container">
        <button onClick={() => this.setState({ filters: { ...this.state.filters, gender: 'male' } })}>male</button>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, gender: 'female' } })}>female</button>
        {profiles.length > 0 ? profiles : 'Loading profiles..'}
      </div>
    )
  }

}

export default App;
