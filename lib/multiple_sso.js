const config = require('../config/env.config.js');
const ssoArray = process.env.SSO_ENDPOINTS || config.sso_endpoints ;

class ssoRes {
    constructor(name, code, msg) {
        this.name = name;
        this.code = code;
        this.msg = msg;
    }
};

function createClient(err, body, cb){

    ssoResponses=[];
    itemsProcessed=0;
    ssoArray.forEach(function (sso, index) {
        console.log('sending client create command to RHSSO ' + sso.name);
        ssoResponses[index]=new ssoRes(name = sso.name);
        request.post(
            {
                url: sso.url,
                json: body,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            function (error,response){
                if (error) {
                    console.log(error);
                    ssoResponses[index]['code']=400;
                    ssoResponses[index]['msg']='Failed sending request to RHSSO';
                    itemsProcessed ++;
                } else {
                    if (response.statusCode !== 201 && response.statusCode !== 200){
                        console.log(response.body);
                        ssoResponses[index]['code']=response.statusCode;
                        ssoResponses[index]['msg']=response.statusMessage;
                        itemsProcessed ++;
                    }
                    else{
                        console.log('client created successfully');
                        ssoResponses[index].code=response.statusCode;
                        ssoResponses[index].msg='client created successfully';
                        itemsProcessed ++;
                    }
                }
                if(itemsProcessed === ssoResponses.length) {
                    return cb(ssoResponses);
                }
            }
        );
    });
    // return cb(ssoResponses);
    // return cb([{name:1, code:200, msg: "good"}, {name:2, code: 201, msg: "v.good"}]);
}

module.exports.createClient = createClient;
