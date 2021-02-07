// This component will allow the user to UPDATE/edit the animal name
// its endagered status, and to DELETE an animal. 

import React, { Component } from 'react';

export default class EditAnimal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animal_name: '',
      animal_isEndangered: ''
    }

    this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
    this.onChangeIsEndangered = this.onChangeIsEndangered.bind(this);
    this.onDeleteAnimal = this.onDeleteAnimal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Retrieve(GET) an animal *based on its ID* and update state
  componentDidMount() { 
    fetch('http://localhost:5000/' + this.props.match.params.id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then( response => {
      console.log( "get animal by id response");
      return response.json()
    })
    .then( data => {
      console.log(" data of an animal ");
      this.setState({
        animal_name: data.name,
        animal_isEndangered: data.isEndangered
      })
    })
    .catch( (error) => {
      console.log(error);
    })

    let logName = this.state.animal_name;
    let logIsEndangered = this.state.animal_isEndangered;
    console.log(logName);
    console.log(logIsEndangered);

  }

  onChangeAnimalName(e) {

  }

  onChangeIsEndangered(e) {

  }

  onDeleteAnimal(e) {

  }

  onSubmit(e) {

  }

  render() {
    return (
      <div>
        <p>Welcome to the Edit Animal Component.</p>
      </div>
    )
  }
}