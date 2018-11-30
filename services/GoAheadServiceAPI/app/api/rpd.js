const mongoose = require('mongoose');
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');

const api = {};

api.store = (User, Rpd, Client, Token) => (req, res) => {
    if (Token) {
        Client.findOne({
            _id: req.body.client
        }, (error, client) => {
            if (error) res.status(400).json(error);

            if (client) {
                const rpd = new Rpd({
                    client_id: req.body.client,
                    user_id: req.query.user_id,
                    client: client.name,
                    state: req.body.state,
                    description: req.body.description,
                    title: req.body.title,
                    objectives: req.body.objectives,
                    placeDisp: req.body.placeDisp,
                    numberSemester: req.body.numberSemester,
                    totalHours: req.body.totalHours,
                    numberCredits: req.body.numberCredits,
                    numberLab: req.body.numberLab,
                    numberPractica: req.body.numberPractica,
                    numberSeminar: req.body.numberSeminar,
                    numberIndependentWork: req.body.numberIndependentWork,
                    items: req.body.items


                });

                rpd.save(error => {
                    if (error) return res.status(400).json(error)
                    res.status(200).json({
                        success: true,
                        message: "РПД успешно добавлена"
                    })
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid client"
                })
            }
        })

    } else return res.status(401).send({
        success: false,
        message: 'Авторизуйтесь, пожалуйста'
    });
}

api.getAll = (User, Rpd, Token) => (req, res) => {
    if (Token) {
        Rpd.find({
            user_id: req.query.user_id
        }, (error, rpd) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(rpd);
            return true;
        })
    } else return res.status(403).send({
        success: false,
        message: 'Авторизируйтесь, пожалуйста'
    });
}

api.getAllFromClient = (User, Rpd, Token) => (req, res) => {
    if (Token) {
        Rpd.find({
            client_id: req.query.client_id
        }, (error, rpd) => {
            if (error) return res.status(400).json(error);
            res.status(200).json(rpd);
            return true;
        })
    } else return res.status(401).send({
        success: false,
        message: 'Авторизируйтесь, пожалуйста'
    });
}

api.index = (User, Rpd, Client, Token) => (req, res) => {
    if (Token) {
        User.findOne({
            _id: req.query.user_id
        }, (error, user) => {
            if (error) res.status(400).json(error);

            if (user) {
                Rpd.findOne({
                    _id: req.query._id
                }, (error, rpd) => {
                    if (error) res.status(400).json(error);
                    res.status(200).json(rpd);
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid rpd"
                })
            }
        })

    } else return res.status(401).send({
        success: false,
        message: 'Авторизируйтесь, пожалуйста'
    });
}

api.edit = (User, Rpd, Client, Token) => (req, res) => {
    if (Token) {
        User.findOne({
            _id: req.query.user_id
        }, (error, user) => {
            if (error) res.status(400).json(error);

            if (user) {
                Rpd.findOneAndUpdate({
                    _id: req.body._id
                }, req.body, (error, rpd) => {
                    if (error) res.status(400).json(error);
                    res.status(200).json(rpd);
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid rpd"
                })
            }
        })

    } else return res.status(401).send({
        success: false,
        message: 'Авторизируйтесь, пожалуйста'
    });
}

api.getByState = (User, Rpd, Client, Token) => (req, res) => {
    if (Token) {
        User.findOne({
            _id: req.query.user_id
        }, (error, user) => {
            if (error) res.status(400).json(error);

            if (user) {
                Rpd.find({
                    state: req.query.state
                }, (error, rpd) => {
                    console.log(rpd)
                    if (error) res.status(400).json(error);
                    res.status(200).json(rpd);
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid rpd"
                })
            }
        })

    } else return res.status(401).send({
        success: false,
        message: 'Авторизуйтесь, пожалуйста'
    });
}

api.remove = (User, Rpd, Client, Token) => (req, res) => {
    if (Token) {
        Rpd.remove({
            _id: req.query._id
        }, (error, removed) => {
            if (error) res.status(400).json(error);
            res.status(200).json({
                success: true,
                message: 'РПД успешно удалена'
            });
        })

    } else return res.status(401).send({
        success: false,
        message: 'Unauthorized'
    });
}
api.test = (User, Rpd) => {
      res.send(
          [{
            title: "Hello World!",
            description: "Hi there! How are you?"
          }]
        )
}
api.exportRpd = (User, Rpd) => (req, res) => {

          Rpd.findOneAndUpdate({
              _id: req.body._id
          }, req.body, (error, rpd) => {
              if (error) res.status(400).json(error);

              var content = fs
                  .readFileSync(path.resolve("./uploads", 'rpd.docx'), 'binary');

              var zip = new JSZip(content);

              var doc = new Docxtemplater();
              doc.loadZip(zip);

              //set the templateVariables
              doc.setData({
                  title: req.body.title
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




              res.status(200).json(rpd);
          })

//Load the docx file as a binary

}

module.exports = api;
