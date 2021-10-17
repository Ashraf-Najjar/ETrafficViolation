const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const violationSchema = new Schema({
    violationType:{
        type: String,
        required: true,
        unique: true
    },
    tax: {
        type: Number,
        required: true
    },
    id:{
        type: Number,
        required: true
    }
});

//mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('Violation', violationSchema);