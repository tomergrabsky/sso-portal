module.exports = {
    "port": 3200,
    "appEndpoint": "http://localhost",
    "sso_endpoints": [
        {
            "name": "rhsso-1",
            "url": "http://sso1.example.com:8080/auth/realms/master/clients-registrations/openid-connect"
        },
        {
            "name": "rhsso-2",
            "url": "http://sso2.example.com:8080/auth/realms/master/clients-registrations/openid-connect"
        }
    ]
};
