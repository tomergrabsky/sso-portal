module.exports = {
    "port": 3200,
    "appEndpoint": "http://localhost",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
     "sso": {
         "ip": "httpbin.org",
         "port": 80
     }
};
