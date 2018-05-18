import React, { Component } from 'react'
// import Form from './Components/buttonFilterFemale'
import Filter from './Filter'
// import HomePage from './Components/homepage'
import './App.css'

class App extends Component{ 
  state = {
    profilSelected: null,
    pageActive: 'home',
    isToggleOn: true,
    profiles: [],
    filters: {
      gender: undefined, // 'male', 'female', undefined (tous)
      skinColor: undefined,
      eyeColor: undefined,
      hairColor: undefined,
      died: undefined,
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

selectLover = profilSelected => this.setState({ profilSelected })


  render(){
    const actualYear = 34
    const birthYear = this.state.profiles.born 
    const age = actualYear - birthYear
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
      .filter(p => {
        if (this.state.hairColor === 'otherHairColor')
          if (p.hairColor !== 'black' && p.eyeColor !== 'brown')
            return true
        if (this.state.hairColor === undefined)
          return true
        if(p.hairColor === this.state.hairColor)
          return true
        return false
      })
      .filter(p => {
        if (this.state.died === undefined) return true
        return p.died !== undefined
      })

      .map(profile => {
        if(this.state.gender === undefined && this.state.skinColor === undefined && this.state.eyeColor === undefined && this.state.hairColor === undefined && this.state.died === undefined)
          return false
        return (
          <div className = 'character' key={profile.image}>
          <img src={profile.image}/>
            <p>{profile.name}</p>
            <p>Age: {34 - profile.born}</p>
            <button onClick = {() => this.setState({pageActive: 'detail', profilSelected: `${profile.name}`})}class="btnEnter">Choose me, Honey!</button>
          </div>
        )
      })

    console.log(this.state.gender)
    console.log(this.state.skinColor)
    console.log(this.state.eyeColor)

    if (this.state.pageActive === 'home')
      return (
        
        <div>
          <div class="clip-circle"></div>
          <h1>Welcome Weary Traveller. <br/> <br/>I am <em>Madame Claude</em> and YOU are about to enter my Intergalactic Palace of Pleasure. <br/>Using the Force - and for a small fee - I shall curate your search for the perfect soulmate throughout all known galaxies, whether you are into human, droid or wookie. <br/><br/> Now relax, take it easy and <em>come inside</em>...</h1>
          <button onClick={() => this.setState({pageActive: 'list'})} class="btnEnter">Enter the Palace of Pleasure</button>
        </div>
      )

    else if (this.state.pageActive === 'list')
      return (
        <div className= "container">
          <button onClick={() => this.setState({pageActive: 'home'})} class="btnEnter">Home</button>
          <br/>
          <img class='img' src="http://i.radikal.com.tr/620x332/2015/12/23/fft107_mf6820635.Jpeg"/>
          <h1> Tell me what you're into, darling... </h1>
          <Filter toggle={this.toggleFilter} current={this.state.gender} type="gender" value="male" />
          <Filter toggle={this.toggleFilter} current={this.state.gender} type="gender" value="female" />
          <Filter toggle={this.toggleFilter} current={this.state.gender} type="gender" value="everything">
          Everything
          </Filter>
          <br/>
          <Filter toggle={this.toggleFilter} current={this.state.skinColor} type="skinColor" value="light">
          Light Skin
          </Filter>
          <Filter toggle={this.toggleFilter} current={this.state.skinColor} type="skinColor" value="dark">
          Dark Skin
          </Filter>
          <Filter toggle={this.toggleFilter} current={this.state.skinColor} type="skinColor" value="otherSkinColor">
            Surprise me!
          </Filter>
          <br/>
          <Filter toggle={this.toggleFilter} current={this.state.eyeColor} type="eyeColor" value="brown">
          Brown Eyes
          </Filter>
          <Filter toggle={this.toggleFilter} current={this.state.eyeColor} type="eyeColor" value="blue">
          Blue Eyes
          </Filter>
          <Filter toggle={this.toggleFilter} current={this.state.eyeColor} type="eyeColor" value="otherEyeColor">
            Surprise me!
          </Filter>
          <br/>
          <Filter toggle={this.toggleFilter} current={this.state.hairColor} type="hairColor" value="black">
          Black Hair
          </Filter>
          <Filter toggle={this.toggleFilter} current={this.state.hairColor} type="hairColor" value="brown">
          Brown Hair
          </Filter>
          <Filter toggle={this.toggleFilter} current={this.state.hairColor} type="hairColor" value="otherHairColor">
          Surprise me!
          </Filter>
          <br/>
          <Filter toggle={this.toggleFilter} current={this.state.died} type="died" value="1">
          Necro option
          </Filter>
          {profiles.length > 0 ? profiles : ''}
        </div>
    )
    else if (this.state.profilSelected){
    const character = this.state.profilSelected
    console.log(character)
    const profil = this.state.profiles.filter(c => c.name === character)
    const profil2 = profil[0]
    const imc = Math.round(profil2.mass /(profil2.height^2))
    const definePrice = (i) => {
    let result = 0
    if (i > 40 || i < 17)
      return result = 100
    else if (i > 30)
      return result = 500
    else
      return result = 1000
    }
    const price = definePrice(imc)
    console.log(profil2)
    console.log(profil2.bornLocation)
      return(
        <div className='detail'key={profil2.image}>
          <button onClick={() => this.setState({pageActive: 'list'})} class="btnEnter">I've changed my mind, go back to menu</button>
          <br/>
          <img src={profil2.image}/>
            <p>Name: {profil2.name}</p>
            <p>Age: {34 - profil2.born}</p>
            <p>Height: {profil2.height} m</p>
            <p>Mass: {profil2.mass} kg</p>
            <p>Species: {profil2.species}</p>
            <p>Hair color: {profil2.hairColor}</p>
            <p>Eye color: {profil2.eyeColor}</p>
            <p className='price'>Price: {price},00 Star Coins</p>
            
          </div>
      )}
   }

}

export default App;
