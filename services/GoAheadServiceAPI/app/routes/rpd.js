const passport = require('passport'),
      config = require('@config'),
      models = require('@GoAheadService/app/setup');
      var JSZip = require('jszip');
      var Docxtemplater = require('docxtemplater');
      var fs = require('fs');
      var path = require('path');
      var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
var upload = multer({dest: DIR}).single('photo');

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

  app.route('/api/v1/rpd/generate')
        .get(api.exportRpd(models.User,models.Rpd))

        app.get('/upload', function(req, res, next) {
        // render the index page, and pass data to it.
          res.render('index', { title: 'Express' });
        });

//our file upload function.
app.post('/upload', function (req, res, next) {
     var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path);
  });
})

  app.route('/api/v1/rpd/test')
        .post(function(req,res) {

              var content = fs
                  .readFileSync(path.resolve("./uploads", 'rpd.docx'), 'binary');

              var zip = new JSZip(content);

              var doc = new Docxtemplater();
              doc.loadZip(zip);

              //set the templateVariables
              doc.setData({
                  title: req.body.title,
                  department: req.body.department,
                  naprPodg: req.body.naprPodg,
                  section: req.body.section,
                  faculty: req.body.faculty,
                  rukOpop: req.body.rukOpop,
                  zavKafedra: req.body.zavKafedra,
                  dataKafedra: req.body.dataKafedra,
                  numProtocolKafedra: req.body.numProtocolKafedra,
                  dataUmk: req.body.dataUmk,
                  numProtocolUmk:  req.body.numProtocolUmk,
                  client: req.body.client,
                  zavKafedra: req.body.zavKafedra,

              });

              try {
                  // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                  doc.render()
              }
              catch (error) {
                  var e = {
                      message: error.message,
                      name: error.name,
                      stack: error.stack,
                      properties: error.properties,
                  }
                  console.log(JSON.stringify({error: e}));
                  // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                  throw error;
              }

              var buf = doc.getZip()
                           .generate({type: 'nodebuffer'});

              // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
              fs.writeFileSync(path.resolve("./uploads", 'output.docx'), buf);
              res.status(200).json(buf);

          })


        }
