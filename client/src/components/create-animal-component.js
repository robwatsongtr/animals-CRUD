import React, { Component } from 'react';

export default class CreateAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal_name: '',
      animal_isEndangered: ''
    }
    this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
    this.onChangeIsEndangered = this.onChangeIsEndangered.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Animal name: ${this.state.animal_name}`);
    console.log(`Is Animal Endangered?: ${this.state.animal_isEndangered}`);

    let data = {
      "name": this.state.animal_name,
      "isEndangered": this.state.animal_isEndangered
    }

    fetch('http://localhost:5000', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .catch( (error) => {
      console.log(error);
    })

    // reset the state 
    this.setState({
      animal_name: '',
      animal_isEndangered: '' 
    })
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Create New Animal</h3>

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
                name="isEndangered"
                id="isEndangered"
                value="true"
                checked={this.state.animal_isEndangered === 'true' }
                onChange={this.onChangeIsEndangered}
                />
              <label className="form-check-label">Is Endangered</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"
                type="radio"
                name="isEndangered"
                id="isNotEndangered"
                value="false"
                checked={this.state.animal_isEndangered === 'false' }
                onChange={this.onChangeIsEndangered}
                />
              <label className="form-check-label">Is Not Endangered</label>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Animal" className="btn btn-primary" />
          </div>

        </form>

      </div>
    )
  }
}