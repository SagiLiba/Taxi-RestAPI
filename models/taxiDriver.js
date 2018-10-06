const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema & Model

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const taxiDriverSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name field is required.']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

// Create a model based on the taxiDriver Schema.
const TaxiDriver = mongoose.model('driver',taxiDriverSchema);

module.exports = TaxiDriver;