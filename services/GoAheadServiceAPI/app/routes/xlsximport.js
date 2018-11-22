const passport = require('passport'),
      config = require('@config'),
      models = require('@GoAheadService/app/setup');

module.exports = (app) => {
    const api = app.GoAheadServiceAPI.app.api.xlsximport;

    app.route('/api/v1/xlsximport')
       .post(api.importxls(models.UchPlan))
}
