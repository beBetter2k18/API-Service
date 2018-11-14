const models = require('@GoAheadService/app/setup');

module.exports = (app) => {
    const api = app.GoAheadServiceAPI.app.api.user;

    app.route('/api/v1/signup')
        .post(api.signup(models.User));
}
