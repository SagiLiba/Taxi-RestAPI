// Set up express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // allows connection to mongodb
const port = 3000;

// Connect to monogodb - Creates it if it does not exists
mongoose.connect('mongodb://localhost/taxidb');
mongoose.Promise = global.Promise; // Overriding mongoose promise because its deprecated

app.use(express.static('public'));

app.use(bodyParser.json()); // app.use(middleware);
// Initialize routes
app.use('/api',require('./routes/api'));
// Error handling
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

// Listen for requests
app.listen(process.env.port || port,function(){
    console.log('Listening for requests');
});