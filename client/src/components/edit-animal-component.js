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
    this.logConsoleGetAnimal = this.logConsoleGetAnimal.bind(this);
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

  logConsoleGetAnimal(e) {
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
                checked={this.state.animal_isEndangered === "true"}
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
                checked={this.state.animal_isEndangered === "false"}
                onChange={this.onChangeIsEndangered}
              />
              <label className="form-check-label">Is Not Endangered</label>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Update Animal" className="btn btn-primary" />
          </div>
          {this.logConsoleGetAnimal()}
        </form>

        
      </div>
      
    )
  }
}