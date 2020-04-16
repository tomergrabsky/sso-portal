const config = require('./config/env.config.js');
const { clientValidationRules, validate } = require('./lib/validator.js')
const send2multipleSSOs = require('./lib/multiple_sso')

request = require('request');

exports.routesConfig = function (app) {
    app.get("/", function(req, res) {
                     res.render('index', { message: ' '});
                 });
    app.get("/new_client", function(req, res) {
                     res.render('index', { message: ' '});
                 });
    app.post("/new_client", clientValidationRules(), validate, (req, res) => {
      const client = req.body;
        client.redirectUris=client.redirectUris.replace(/(\r\n|\n|\r)/gm,"__@__").split("__@__");
        console.log(client.redirectUris)
        client.description={
        "contactName": client.contactName,
        "contactPhone": client.contactPhone
        };

        body = {
             "clientId": client.id,
              "secret": client.secret,
              "redirectUris": client.redirectUris,
             "description": JSON.stringify(client.description),
//              "rootUrl": client.rootUrl,
              "name": client.name
        };
        console.log();
        console.log(req.body);

//        Send to RHSSOs:
        send2multipleSSOs.createClient(null, body,function(ssoResponses) {
            message = "";
            ssoResponses.forEach(function (ssoRes, index) {
                if (client.webForm) {
                    message += ssoRes.name + ": " + ssoRes.msg + " | ";
                    if (ssoRes.code !== 201 && ssoRes.code !== 200) {
                        message += " erro code: " + ssoRes.code + " | ";
                    }
                } else {
                    console.log('This is API call')
                }

            });
            if (client.webForm) {
                res.render('index', { message:message});
            } else {
                res.status(201).json({
                    message: "client created successfully | "
                });
            }
        })
    });
};