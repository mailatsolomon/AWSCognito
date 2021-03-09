
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const v1 = require("./routes/v1");
const publicRoute = require("./routes/public");
const bodyParser = require ("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use(cors());

app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, No-Auth, Accept, application/x-www-form-urlencoded, x-client-key, x-client-token, x-client-secret, Authorization, access_token, X-Auth-Token");
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        next();
});

app.use("/v1", v1);

app.get('/', (req, res) => {
        res.send('Welcome to MAILA SOLOMON API!')
});

module.exports = app;