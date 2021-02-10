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
      console.log( "GET animal by id response");
      return response.json()
    })
    .then( data => {
      console.log("data of an animal");
      this.setState({
        animal_name: data.name,
        animal_isEndangered: data.isEndangered
      })
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  
  onChangeAnimalName(e) {
    this.setState({
      animal_name: e.target.value
    })
  }

  onChangeIsEndangered(e) {
    this.setState({
      animal_isEndangered: e.target.value
    })
  }

  onDeleteAnimal(e) {

  }

  // This should update the name and endagered status of the animal
  // being edited. 
  onSubmit(e) {
    e.preventDefault();
    let data = {
      "name": this.state.animal_name,
      "isEndangered": this.state.animal_isEndangered
    }

    fetch('http://localhost:5000' + this.props.match.params.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch( (error) => {
      console.log(error);
    })
    this.props.history.push('/'); // tells router to go back to default route
  }

  render() {
    return (
      <div> 
        <h3>Update Animal</h3>

        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              className="form-control"
              value={this.state.animal_name}
              onChange={this.onChangeAnimalName}
            />
          </div>

          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input"
                type="radio"
                name="isEndangeredStatus"
                id="isEndangered"
                value="true"
                checked={this.state.animal_isEndangered}
                onChange={this.onChangeIsEndangered}
              />
              <label className="form-check-label">Is Endangered</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"
                type="radio"
                name="isEndangeredStatus"
                id="isNotEndangered"
                value="false"
                checked={!this.state.animal_isEndangered}
                onChange={this.onChangeIsEndangered}
              />
              <label className="form-check-label">Is Not Endangered</label>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Update Animal" className="btn btn-primary" />
          </div>
          

        </form>

      </div>
      
    )
  }
}