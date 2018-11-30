const passport = require('passport'),
    config = require('@config'),
    models = require('@GoAheadService/app/setup');

module.exports = (app) => {
    const api = app.GoAheadServiceAPI.app.api.rpd;

    app.route('/api/v1/rpd')
        .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Rpd, models.Client, app.get('goaheadsecret')))
        .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Rpd, app.get('goaheadsecret')))
        .get(passport.authenticate('jwt', config.session), api.getAllFromClient(models.User, models.Rpd, app.get('goaheadsecret')))
        .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Rpd, models.Client, app.get('goaheadsecret')))

    app.route('/api/v1/rpd/single')
        .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Rpd, models.Client, app.get('goaheadsecret')))
        .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Rpd, models.Client, app.get('goaheadsecret')))

    app.route('/api/v1/rpd/state')
        .get(passport.authenticate('jwt', config.session), api.getByState(models.User, models.Rpd, models.Client, app.get('goaheadsecret')))
}