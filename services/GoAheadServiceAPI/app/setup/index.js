const mongoose = require('mongoose'),
    UserModel = require('@GoAheadServiceModels/user'),
    RpdModel = require('@GoAheadServiceModels/rpd'),
    ClientModel = require('@GoAheadServiceModels/client'),
    UchPlanModel = require('@GoAheadServiceModels/UchPlan');

const models = {
    User: mongoose.model('User'),
    Rpd: mongoose.model('Rpd'),
    Client: mongoose.model('Client'),
    UchPlan: mongoose.model('UchPlan')

}

module.exports = models;