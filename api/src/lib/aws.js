const AWS = require ('aws-sdk');
const env = require ('../utils/env');
env.config()

AWS.config.update({
        region:'ap-southeast-1'
    }
);

module.exports= AWS;
