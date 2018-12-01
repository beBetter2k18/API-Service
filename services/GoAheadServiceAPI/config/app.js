const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    consign = require('consign'),
    cors = require('cors'),
    passport = require('passport'),
    passportConfig = require('./passport')(passport),
    jwt = require('jsonwebtoken'),
    config = require('./index.js'),
    database = require('./database')(mongoose, config);
    var  officegen  = require ( 'officegen' ) ;

app.use(express.static('.'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(passport.initialize());

app.set('goaheadsecret', config.secret);

consign({
        cwd: 'services'
    })
    .include('GoAheadServiceAPI/app/setup')
    .then('GoAheadServiceAPI/app/api')
    .then('GoAheadServiceAPI/app/routes')
    .into(app);

module.exports = app;
