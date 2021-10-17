const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const vehiclesLogSchema = new Schema({
    plugedNumber:{
        type: Number,
        required: true,
        unique: true
    },
    driver: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    productionDate:{
        type: Date,
        required: true
    },
    registrationDate:{
        type: Date,
        required: true
    },
    IsCrossOut:{
        type: Boolean,
        default: false
    },
    role: String
});

//mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('VehiclesLog', vehiclesLogSchema);