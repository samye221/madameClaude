import React, { Component } from 'react'
// import Form from './Components/buttonFilterFemale'
import Filter from './Filter'
// import HomePage from './Components/homepage'
import './App.css'

class App extends Component{ 
  state = {
    pageActive: 'home',
    isToggleOn: true,
    profiles: [],
    filters: {
      gender: undefined, // 'male', 'female', undefined (tous)
      skinColor: undefined,
      eyeColor: undefined
    }
  }




  toggleFilter = (type, value) => this.setState({
    [type]: this.state[type] === value ? undefined : value
  })

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
        if (this.state.gender === 'everything')
          return true
        if (this.state.gender === undefined)
          return true
        if(p.gender === this.state.gender)
          return true
        return false
      })
      .filter(p => {
        if (this.state.skinColor === 'otherSkinColor')
          if (p.skinColor !== 'dark' && p.skinColor !== 'light')
            return true
        if (this.state.skinColor === undefined)
          return true
        if(p.skinColor === this.state.skinColor)
          return true
        return false
      })
      .filter(p => {
        if (this.state.eyeColor === 'otherEyeColor')
          if (p.eyeColor !== 'brown' && p.eyeColor !== 'blue')
            return true
        if (this.state.eyeColor === undefined)
          return true
        if(p.eyeColor === this.state.eyeColor)
          return true
        return false
      })
      .map(profile => {
        if(this.state.gender === undefined && this.state.skinColor === undefined && this.state.eyeColor === undefined)
          return false
        return (
          <div key={profile.image}>
          <img src={profile.image}/>
            <p>{profile.name}</p>
          </div>
        )
      })

    console.log(this.state.gender)
    console.log(this.state.skinColor)
    console.log(this.state.eyeColor)

    if (this.state.pageActive === 'home')
      return (
        <div>
          <h1>Welcome Weary Traveller. 
  I am Madame Claude and you are about to enter my Intergalactic Palace of Pleasure. Using the Force - and for a small fee - I shall curate your search for the perfect soulmate throughout all known galaxies, whether you are into human, droid or wookie. Now relax, take it easy and come inside.</h1>
          <button onClick={() => this.setState({pageActive: 'oiehfohz'})} class="btnEnter">Enter the Palace of Pleasure</button>
        </div>
      )
    else 
      return (
        <div className= "container">
          <Filter toggle={this.toggleFilter} current={this.state.gender} type="gender" value="male" />
          <Filter toggle={this.toggleFilter} current={this.state.gender} type="gender" value="female" />
          <Filter toggle={this.toggleFilter} current={this.state.gender} type="gender" value="everything">
          Everything
          </Filter>
          <br/>
          <Filter toggle={this.toggleFilter} current={this.state.skinColor} type="skinColor" value="light" />
          <Filter toggle={this.toggleFilter} current={this.state.skinColor} type="skinColor" value="dark" />
          <Filter toggle={this.toggleFilter} current={this.state.skinColor} type="skinColor" value="otherSkinColor">
            Surprise me !
          </Filter>
          <br/>
          <Filter toggle={this.toggleFilter} current={this.state.eyeColor} type="eyeColor" value="brown" />
          <Filter toggle={this.toggleFilter} current={this.state.eyeColor} type="eyeColor" value="blue" />
          <Filter toggle={this.toggleFilter} current={this.state.eyeColor} type="eyeColor" value="otherEyeColor">
            Surprise me !
          </Filter>

          {profiles.length > 0 ? profiles : 'What do you like my dear'}
        </div>
    )
  }

}

export default App;
