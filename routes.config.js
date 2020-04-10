const config = require('./config/env.config.js');
const { clientValidationRules, validate } = require('./lib/validator.js')

let clients = [];
request = require('request');

exports.routesConfig = function (app) {
    app.get("/", function(req, res) {
                     res.render('index', { title: 'Add New Client' });
                 });
    app.post("/new_client", clientValidationRules(), validate, (req, res) => {
      const client = req.body;
      if (client.id || client.secret || client.redirectUris || client.rootUrl || client.name) {
        clients.push({
          ...client,
          id: clients.length + 1,
          date: Date.now().toString()
        });
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
              "description": client.description,
//              "rootUrl": client.rootUrl,
              "name": client.name
        }
        console.log();
        console.log(req.body);
//        Send to RHSSO:
        request.post(
        {
            url:'http://'+config.sso.ip+':'+config.sso.port+'/post',
//            url: 'https://10.35.76.246:8593/auth/realms/master/clients-registrations/openid-connect',
            json: body,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        function(error, response, body){
            if (error) {
               console.log(error);
               res.status(400).json({message: "Failed sending request to RHSSO"})
            } else {
                if (response.statusCode !== 200){
                    console.log(response.body);
                    res.status(400).json({message: "RHSSO failed to create client, returned: " + response.statusCode + " message: " + response.statusMessage})
                } else{
                console.log(response.body);
                res.status(200).json({
                  message: "client created successfully"
                });}
        }});
      } else {
        res.status(401).json({
          message: "Invalid client creation"
        });
      };
    });

};