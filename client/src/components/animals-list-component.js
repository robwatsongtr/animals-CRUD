// This component will READ/list the contents of the animal database. 

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Animal = props => {
  return (
  <tr key={props.animalID}>
    <td>{props.animal.name}</td>
    <td>{props.animal.isEndangered ? "yes" : "no" }</td>
    <td>
      <Link to={"/" + props.animal._id}>Edit</Link>
    </td>
  </tr>
  )
}

export default class AnimalsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then( response => {
      console.log( "animals response" )
      return response.json()
    })
    .then( data => {
      console.log(" animals data ")
      this.setState({ animals: data});
    })
    .catch( (error) => {
      console.log(error);
    })
  }
  
  // Iterate through the list of animals using map. Each animal
  // is output using the Animal component, the current animal is assigned
  // to the animal property of this component. 
  //
  // First return statement sets up the map, second outputs to Animal component
  // for display 
  animalList() {
    if (this.state.animals) {
      return this.state.animals.map( (currentAnimal, i) => {
        console.log("current", currentAnimal)
        return ( <Animal animal={currentAnimal} animalID={i} /> )
      })
    } else {
      return null; 
    }
  }

  render() {
    return (
      <div>
        <h3>Animals List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Name</th>
              <th>Is Endangered?</th>
            </tr>
          </thead>
          <tbody>
            { this.animalList() }
          </tbody>
        </table>
      </div>
    )
  }
}