const models = require('@GoAheadService/app/setup');

module.exports = (app) => {
    const api = app.GoAheadServiceAPI.app.api.auth;

    app.route('/')
        .get((req, res) => res.send('GoAhead Service API'));

    app.route('/api/v1/auth')
        .post(api.login(models.User));
}
