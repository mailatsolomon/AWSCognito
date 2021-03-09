const errorReturnsEntity = {
    fullNameIsRequired: {
      code: 2,
      message: "Full Name is required.",
    },
    addressIsRequired: {
      code: 2,
      message: "Address is required."
    }, 
    userNameIsRequired: {
      code: 2, 
      message: "Username is required."
    },
    credentialsAreRequired: {
      code: 2,
      message: "Credential/s is/are required.",
    },
    accessTokenRequired: {
      code: 2,
      message: "Access Denied. Missing token.",
    },
    dataAlreadyExist: {
      code: 3,
      message: "Data already exist.",
    },
    userAlreadyExist: {
      code: 3,
      message: "User already exist.",
    },
    dataDoesNotExist: {
      code: 3,
      message: "Data doesn't exist.",
    },
    userDoesNotExist: {
      code: 4,
      message: "User doesn't exist.",
    },
    noDataFound: {
      code: 5,
      message: "No data found.",
    },
    failedRetrieveData: {
        code: 5,
        message: "Failed to retrieve data.",
      },
    sessionExpired: {
      code: 6,
      message: "Session has expired. Kindly log-in",
    },
    tokenExpired: {
      code: 6,
      message: "Token has expired, kindly log-in",
    },
    incorrectCredentials: {
      code: 7,
      message: "Incorrect Credential/s.",
    },
    incorrectPin: {
        code: 7,
        message: "Incorrect PIN.",
      },
    incorrectData: {
      code: 7,
      message: "Incorrect Data.",
    },
    emailIsNotAvailable: {
      code: 8,
      message: "Email is not available.",
    },
    invalidSession: {
      code: 9,
      message: "Access denied, Invalid Session. Kindly log-in",
    },
    invalidToken: {
      code: 9,
      message: "Access denied, Invalid Token. Kindly log-in",
    },
    userIdDoesNotMatched: {
      code: 10,
      message: "Access denied. Token user ID doesn't matched to request id.",
    },
    credentialsDoesNotMatch: {
      code: 10,
      message: "Access denied. Credentials provided doesn't matched.",
    },
    incorrectConfirmationCode: {
      code: 12,
      message: "Incorrect confirmation code.",
    },
    requestAlreadyCompleted: {
      code: 13,
      message: "Request was already completed",
    },
    userNotVerified: {
      code: 14,
      message: "User not verified.",
    },
    userAlreadyVerified: {
      code: 15,
      message: "User already verified.",
    },
    noSendingOfPushNotification: {
      code: 16,
      message: "No Sending of Push Notification.",
    },
    internalServerError: {
      code    : 3002,
      message : 'Internal server error.',
    },
    onlyAdminCanAccess: {
      code: 17,
      message: "Access Denied, Admin can only access this route.",
  },
    onlyCorporateCanAccess: {
      code: 17,
      message: "Access Denied, Corporate can only access this route.",
  },
  onlyPeerCanAccess: {
    code: 17,
    message: "Access Denied, Peer can only access this route.",
  },
    incorrectInputItShouldBeNumber: {
      code: 7,
      message: "Incorrect input, numbers only",
    },
    unableToCancelRequest: {
      code: 18,
      message: "Unable to cancel request at this point.",
    },
    unableToUpdateRequest: {
      code: 19,
      message: "Unable to update request at this point.",
    },
    noDeviceToken: {
      code: 20,
      message: "Request updated, push notification failed : no device token provided.",
    }
  };
  
module.exports = errorReturnsEntity;
  