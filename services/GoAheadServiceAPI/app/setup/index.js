const mongoose = require('mongoose'),
    UserModel = require('@GoAheadServiceModels/user'),
    RpdModel = require('@GoAheadServiceModels/rpd'),
    ClientModel = require('@GoAheadServiceModels/client');

const models = {
    User: mongoose.model('User'),
    Rpd: mongoose.model('Rpd'),
    Client: mongoose.model('Client')
}

module.exports = models;
