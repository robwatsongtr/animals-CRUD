/* Endangered Animals App Back-end */

// Express setup 
const express = require('express');
const mongoose = require('mongoose');
const config = require('config'); // stores the URI securely 
const path = require('path');
const cors = require('cors');
const port = 5000;
const app = express();
const bodyParser = require('body-parser');

// MongoDB atlas setup
const db = config.get('mongoURI');  // URI is 'mongoURI', stored in default.json
const Animal = require('./models/Animal');

// Middleware setup 
app.use(cors());
app.use(bodyParser.json()); // tells the (app) server to use bodyParser
app.use(bodyParser.urlencoded({extended: false}));

// Initialize database 
mongoose
  .connect( db, {
    useNewURLParser: true,
    useCreateIndex: true,
    useFindAndModify: false,  
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// API endpoint to READ(GET) all entries
app.get('/', (req, res) => {
  Animal.find()
    .sort({ date: -1})
    .then(items => console.log(res.json(items)));
})

// API endpoint to READ(GET) an entry by ID
app.get('/:id', (req, res) => {
  let id = req.params.id; 
  Animal.findById(id, (err, data) => {
    res.json(data);
  })
});

// API endpoint to CREATE(POST) an entry
app.post('/', (req, res) => {
  const newAnimal = new Animal({
      name: req.body.name,
      isEndangered: req.body.isEndangered || false,
    })
    newAnimal
      .save()
      .then(item => res.json(item))
      .catch(err => res.status(500).json({ success: false}));
});

// API endpoints to DELETE. Its common practice to put the ID of 
// the item inside the URL, so :id is added to the path string. 
app.delete('/:id', (req, res) => {
  Animal.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
})

// API Endpoint to UPDATE(PUT)
app.put('/:id', (req, res) => {
  Animal.findOneAndUpdate({ _id: req.params.id} , req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false} ));
})


app.listen( port, () => 
  console.log(`Server sterted on port: http://localhost:${port}`))