const AWS = require ("../lib/aws");

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "ap-southeast-1",
  apiVersion: "2016-04-18"
});

module.exports= cognito;
