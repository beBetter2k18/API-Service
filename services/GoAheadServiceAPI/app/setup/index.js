const mongoose = require('mongoose'),
    UserModel = require('@GoAheadServiceModels/user'),
    BudgetModel = require('@GoAheadServiceModels/budget'),
    ClientModel = require('@GoAheadServiceModels/client');

const models = {
    User: mongoose.model('User'),
    Budget: mongoose.model('Budget'),
    Client: mongoose.model('Client')
}

module.exports = models;
