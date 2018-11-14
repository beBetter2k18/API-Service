const passport = require('passport'),
    config = require('@config'),
    models = require('@GoAheadService/app/setup');

module.exports = (app) => {
    const api = app.GoAheadServiceAPI.app.api.client;

    app.route('/api/v1/client')
        .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Client, app.get('goaheadsecret')))
        .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Client, app.get('goaheadsecret')))
        .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Client, app.get('goaheadsecret')))

    app.route('/api/v1/client/single')
        .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Client, app.get('goaheadsecret')))
        .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Client, app.get('goaheadsecret')))
}
