const config = require('./config/env.config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let path = require('path');

const port = process.env.PORT || config.port || 3200;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const router = require('./routes.config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router.routesConfig(app);


app.listen(port, function () {
    console.log('app listening at port %s', port);
    console.log('app endpoint %s', config.appEndpoint);
});
