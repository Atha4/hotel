const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({

name: { type: String, required: true },
age: { type: Number },
job: { type: String, required: true },
mobile: { type: Number, required: true },
username: { type: String, required: true},
password: { type: String, required: true}

});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;