import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// get me some of that bootstrap 
import "bootstrap/dist/css/bootstrap.min.css";

// components for react router, where they at? 
import CreateAnimal from "./components/create-animal-component";
import EditAnimal from "./components/edit-animal-component";
import AnimalsList from "./components/animals-list-component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Endangered Animals App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Animals</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Animal</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={AnimalsList} />
          <Route path="/edit/:id" component={EditAnimal} />
          <Route path="/create" component={CreateAnimal} />
        </div>
      </Router>
    );
  }
}

export default App;
