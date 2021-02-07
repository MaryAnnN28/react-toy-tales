import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  componentDidMount() {
    fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(toyData => {
        this.setState({
          toys: toyData
        })
      })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }


// ********************************************************
  // UpdateLikes function on ToyCard.js 

  updateLikes = (toy) => {
    let newLikes = {
      likes: ++toy.likes 
    }

    let reqPack = {
      headers: { "Content-Type": "application/json" }, 
      method: 'PATCH', 
      body: JSON.stringify(newLikes)
    }

    fetch(`http://localhost:3000/toys/${toy.id}`, reqPack)
      .then(res => res.json())
      .then(newToy => {
        this.setState({
        toys: this.state.toys.map(toy => (toy.id === newToy.id) ? newToy : toy)
      })
    })
  }
 // ********************************************************
  // donateToy method on ToyCard.js 
  
  donateToy = (id) => {

    fetch(`http://localhost:3000/toys/${id}`, { method: 'DELETE' })
    this.setState({
      toys: this.state.toys.filter(toy => toy.id !== id)
    })
  }

   // ********************************************************

  // NewToyForm 

  newToyForm = (event) => {
    event.preventDefault()
    let newToy = {
      name: event.target.name.value, 
      image: event.target.image.value 
    }
    event.target.reset()
    
    let reqPack = {
      headers: { "Content-Type": "application/json" }, 
      method: 'POST', 
      body: JSON.stringify(newToy)
    }
    fetch('http://localhost:3000/toys', reqPack)
      .then(res => res.json())
      .then(toyInfo => {
        this.setState({
        toys: [...this.state.toys, toyInfo]
      })
    })
  }

  // ********************************************************

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToyForm={this.newToyForm}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} updateLikes={this.updateLikes} donateToy={this.donateToy}/>
      </>
    );
  }

}

export default App;
