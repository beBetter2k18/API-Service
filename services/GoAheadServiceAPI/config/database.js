module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;

    mongoose.connect(config.database, {
        //useMongoClient: true,
        promiseLibrary: global.Promise
    });

    database.on('error', error => console.log(`Connection to GoAheadService database failed: ${error}`));
    database.on('connected', () => console.log('Connected to GoAheadService database'));
    database.on('disconnected', () => console.log('Disconnected from GoAheadService database'));

    process.on('SIGINT', () => {
        database.close(() => {
            console.log('GoAheadService terminated, connection closed');
            process.exit(0);
        })
    });
};
