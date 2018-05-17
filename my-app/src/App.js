import React, { Component } from 'react';
// import Form from './Components/buttonFilterFemale'
import './App.css';

class App extends Component{ 
  constructor(){
    super();
    this.state = {
      profiles: [],
      filters: {
        gender: undefined, // 'male', 'female', undefined (tous)
        skinColor: undefined,
        eyeColor: undefined
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
      .filter(p => {
        if (this.state.filters.gender === undefined)
          return true
        if(p.gender === this.state.filters.gender)
          return true
        return false
      })
      .filter(p => {
        if (this.state.filters.skinColor === 'otherSkinColor')
          if (p.skinColor !== 'dark' && p.skinColor !== 'light')
            return true
        if (this.state.filters.skinColor === undefined)
          return true
        if(p.skinColor === this.state.filters.skinColor)
          return true
        return false
      })
      .filter(p => {
        if (this.state.filters.eyeColor === 'otherEyeColor')
          if (p.eyeColor !== 'brown' && p.eyeColor !== 'blue')
            return true
        if (this.state.filters.eyeColor === undefined)
          return true
        if(p.eyeColor === this.state.filters.eyeColor)
          return true
        return false
      })
      .map(profile => {
        if(this.state.filters.gender === undefined && this.state.filters.skinColor === undefined && this.state.filters.eyeColor === undefined)
          return false
        return (
          <div key={profile.image}>
          <img src={profile.image}/>
            <p>{profile.name}</p>
          </div>
        )
      })
console.log(this.state.filters.gender)
console.log(this.state.filters.skinColor)
console.log(this.state.filters.eyeColor)

    return (
      <div className= "container">
        <button onClick={() => this.setState({ filters: { ...this.state.filters, gender: 'male' } })}>Male</button>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, gender: 'female' } })}>Female</button>
        <br/>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, skinColor: 'light' } })}>Light</button>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, skinColor: 'dark' } })}>Dark</button>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, skinColor: 'otherSkinColor' } })}>Surprise me !</button>
        <br/>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, eyeColor: 'brown' } })}>Brown</button>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, eyeColor: 'blue' } })}>Blue</button>
        <button onClick={() => this.setState({ filters: { ...this.state.filters, eyeColor: 'otherEyeColor' } })}>Surprise me !</button>

        {profiles.length > 0 ? profiles : 'What do you like my dear'}
      </div>
    )
  }

}

export default App;
