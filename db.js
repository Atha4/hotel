require('dotenv').config();
const mongoose = require('mongoose');
//const mongoURL = 'mongodb://localhost:27017/atharva';
//const mongoURL = process.env.DB_URL;
const mongoURL = process.env.DB_URL_LOCAL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('open', () => {
    console.log('Connection is Established');
});

db.on('error',(err) => {
    console.log('Error has occured');
});

db.on('disconnected', () => {
    console.log('Disconnection has Occured');
});
module.exports = db;


