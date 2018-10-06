// Set up express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // allows connection to mongodb
const port = process.env.PORT || 3000;

// Connect to monogodb - Creates it if it does not exists
mongoose.connect( process.env.MONGODB_URI);
mongoose.Promise = global.Promise; // Overriding mongoose promise because its deprecated

app.use(express.static('public'));

app.use(bodyParser.json());
// Initialize routes
app.use('/api',require('./routes/api'));
// Error handling
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

// Listen for requests
app.listen(port,function(){
    console.log('Listening for requests on port: ' + port);
    console.log("ENV_MONGO: "+ process.env.MONGODB_URI );
});
