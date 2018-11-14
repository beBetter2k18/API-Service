const passport = require('passport'),
      config = require('@config'),
      models = require('@GoAheadService/app/setup');

module.exports = (app) => {
  const api = app.GoAheadServiceAPI.app.api.budget;

  app.route('/api/v1/budget')
     .post(passport.authenticate('jwt', config.session), api.store(models.User, models.Budget, models.Client, app.get('goaheadsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAll(models.User, models.Budget, app.get('goaheadsecret')))
     .get(passport.authenticate('jwt', config.session), api.getAllFromClient(models.User, models.Budget, app.get('goaheadsecret')))
     .delete(passport.authenticate('jwt', config.session), api.remove(models.User, models.Budget, models.Client, app.get('goaheadsecret')))

  app.route('/api/v1/budget/single')
     .get(passport.authenticate('jwt', config.session), api.index(models.User, models.Budget, models.Client, app.get('goaheadsecret')))
     .put(passport.authenticate('jwt', config.session), api.edit(models.User, models.Budget, models.Client, app.get('goaheadsecret')))

  app.route('/api/v1/budget/state')
     .get(passport.authenticate('jwt', config.session), api.getByState(models.User, models.Budget, models.Client, app.get('goaheadsecret')))
}
