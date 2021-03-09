/*libraries*/
var moment = require("moment");
moment().format();

/*Utils*/
const cognito = require("../utils/cognitoAuth");
const env = require("../utils/env");
env.config();
const {tableUsers,} = require("../utils/queries");

/*Entities*/
const errorReturnsEntity = require("../entities/errorReturnsEntity");
const successfulReturnsEntity = require("../entities/successfulReturnsEntity");
const userLoginEntity = require("../entities/userLoginEntity");

/* Register user - without password */
async function addUser(req, res) {
    var username;
    let userAttribute;
    
    if (!req.body.full_name ||!req.body.address ||!req.body.email ) {
        return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
    }
    
    username = req.body.email;

    userAttribute = [
        { Name: "name", Value: req.body.full_name },
        { Name: "nickname", Value: req.body.full_name },
        { Name: "email", Value: req.body.email },
        { Name: "address", Value: req.body.address }
    ];

    userLoginEntity.UserPoolId = process.env.COGNITO_USERPOOL_ID;
    delete userLoginEntity.AuthFlow;
    delete userLoginEntity.ClientId;
    delete userLoginEntity.AuthParameters;
  
    const userEntity = {
        ClientId: process.env.COGNITO_APP_CLIENT_NAME,
        Username: username,
        Password: process.env.COGNITO_USERKEY,
        UserAttributes: userAttribute,
        ValidationData: [{ Name: "Test", Value: "STRING_VALUE" }],
    };
  
    try {
        let result = await cognito.signUp(userEntity).promise();
        res.status(200).json({code: 0,user_id: result.UserSub,});
    } catch (err) {
        // throw err
        res.status(400).json({ code: 1, message: err.message });
    }
}

/* Verification */
async function verifyOtp(req, res) {
    let getUserResult;
  
    if (!req.body.confirmation_code || !req.body.user_id) {
        return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
    }
  
    userRegisterEntity.ClientId = process.env.COGNITO_APP_CLIENT_NAME;
    userRegisterEntity.ConfirmationCode = req.body.confirmation_code;
    userRegisterEntity.Username = req.body.user_id;
    delete userRegisterEntity.UserAttributes;
    delete userRegisterEntity.Password;
    delete userRegisterEntity.ValidationData;
  
    try {
      let check_result = await checkEmail(userEntity);
      let result = await cognito.confirmSignUp(userRegisterEntity).promise();
      
      getUserResult = await cognito.adminGetUser(userEntity).promise();
      let userData = getUserResult.UserAttributes;
      let atts = {};
  
      userData.map((item) => {
            let { Name, Value } = item;
  
            if (Name == "name") {
                atts[Name] = Value;
            }
            if (Name == "email") {
                atts[Name] = Value;
            }
      });
  
      //create user to user table
      userTableEntity.userId = req.body.user_id;
      (userTableEntity.createdAt = localeTimeZone),
        (userTableEntity.fullName = atts.name);
      userTableEntity.emailAddress = atts.email;
      
      /* Do the insert on the DB here, once the user was already verified */
      await insertUser(userTableEntity);
      
      res.status(200).json(successfulReturnsEntity.userConfirmationSuccess);
    
    } catch (error) {
        console.log(error);
        if (error.code == "NotAuthorizedException") {
                return res.status(400).json(errorReturnsEntity.userAlreadyVerified);
        }
        if (error.code == "UserNotFoundException") {
                return res.status(400).json(errorReturnsEntity.userDoesNotExist);
        }
        if (error.code == "CodeMismatchException") {
                return res.status(400).json(errorReturnsEntity.incorrectConfirmationCode);
        } else {
                return res.status(400).json({ code: 1, message: error.message });
        }
    }
}

/* Login user in cognito*/
async function loginUser(req, res) {

    if (!req.body.username) {
        return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
    }
  
    const userCredentialsOtp = {
        AuthFlow: "CUSTOM_AUTH",
        ClientId: process.env.COGNITO_APP_CLIENT_NAME,
        AuthParameters: {
            USERNAME: req.body.username,
            PASSWORD: req.body.password,
        },
    };
  
    try {
        if (data.userId) {
            let cognito_information = await cognito.initiateAuth(userCredentialsOtp).promise();
            return res.status(200).json({code: 11,session: cognito_information.Session,user_id: cognito_information.ChallengeParameters.USERNAME});
        } else {
            return res.status(401).json(errorReturnsEntity.userDoesNotExist);
        }
    } catch (err) {
        return res.status(400).json({ code: 7, message: err.message });
    }
} 
  
/* Login user Confimation */
async function loginUserConfirmation(req, res) {
    let result = {};
    var platform,
      device_token = "",
      os_version,
      model = "",
      connection_type;
      
    platform = req.body.platform;
    os_version = req.body.os_version;
    model = req.body.model;
    device_token = req.body.device_token;
    connection_type = req.body.connection_type;
  
    if (!req.body.confirmation_code || !req.body.user_id || !req.body.session) {
      return res.status(400).json(errorReturnsEntity.credentialsAreRequired);
    }
    if (!req.body.device_token) {
      device_token = "";
    }
  
    const userRespondToAuthEntity = {
      ClientId: process.env.COGNITO_APP_CLIENT_NAME,
      Session: req.body.session,
      ChallengeName: "CUSTOM_CHALLENGE",
      ChallengeResponses: {
        CODE: req.body.confirmation_code,
        USERNAME: req.body.user_id,
        ANSWER: req.body.confirmation_code,
      },
    };
  
    let usersDeviceToken = {};
    usersDeviceToken.userId = req.body.user_id;
    usersDeviceToken.platform = platform;
    usersDeviceToken.osVersion = os_version;
    usersDeviceToken.model = model;
    usersDeviceToken.connectionType = connection_type;
    usersDeviceToken.deviceToken = device_token;
    usersDeviceToken.createdAt = localeTimeZone;
  
    try {
    
        let cognito_return = await cognito.respondToAuthChallenge(userRespondToAuthEntity).promise();
        var resultinsert = await insertUserDeviceToken(usersDeviceToken);
        res.status(200).json({code: 0,access_token: cognito_return.AuthenticationResult.AccessToken,expiration: cognito_return.AuthenticationResult.ExpiresIn,refresh_token: cognito_return.AuthenticationResult.RefreshToken});
    
    } catch (err) {
        console.log(err);
        if (err.message == "User is not confirmed.") {
                return res.status(400).json(errorReturnsEntity.userNotVerified);
        }
        if (err.message == "User does not exist.") {
                return res.status(400).json(errorReturnsEntity.userDoesNotExist);
        }
        if (err.message == "Incorrect username or password.") {
                return res.status(401).json(errorReturnsEntity.incorrectConfirmationCode);
        } else {
            if (err.message == "Invalid session for the user." ||err.message == "Invalid session provided") {
                    return res.status(401).json(errorReturnsEntity.invalidSession);
            } else {
                    return res.status(400).json({ code: 1, message: err.message });
            }
      }
    }
}

/* Insert User Table*/
async function insertUser(params) {
    var userDetails = {
      ...tableUsers,
      Item: params,
    };
    console.log("Adding:", userDetails);
    return dynamoDb.put(userDetails, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Entry Added!`);
      }
    });
}
  
module.exports = {
    addUser,
    verifyOtp,
    loginUser,
    loginUserConfirmation
};
  
  