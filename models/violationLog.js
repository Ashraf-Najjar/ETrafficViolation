const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const violationLogSchema = new Schema({
    plugedNumber:{
        type: Number,
        required: true,
    },
    violation_id: {
        type: Schema.Types.ObjectId,
        ref: 'Violation',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    isPaid:{
        type: Boolean,
        required: true
    }
});

//mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('ViolationLog', violationLogSchema);