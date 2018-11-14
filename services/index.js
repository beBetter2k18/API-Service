require('module-alias/register');
const http = require('http'),
    GoAheadServiceAPI = require('@GoAheadServiceAPI'),
    GoAheadServiceServer = http.Server(GoAheadServiceAPI),
    GoAheadServicePORT = process.env.PORT || 3001,
    LOCAL = '0.0.0.0';

GoAheadServiceServer.listen(GoAheadServicePORT, LOCAL, () => console.log(`GoAheadService running on ${GoAheadServicePORT}`));
