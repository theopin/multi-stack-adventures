import AccountService from "../services/accounts.service.js";
import { HttpResponse } from '../../constants/httpResponse.js';

const serverErrorResponse = JSON.stringify({
  statusCode: HttpResponse.INTERNAL_SERVER_ERROR,
  response: {
      status: false,
      message: "Error in request fulfilment!",
  }
})

export function createAccount(req, res) {
  const { username, password, balance } = req.body;
  AccountService.createAccount(username, password, balance)
    .then((response) => {
      return res.status(201).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'ValidationError') {
          errorResponse.statusCode = HttpResponse.BAD_REQUEST
          errorResponse.response.message = "Username and/or Password are missing or invalid amount!"
      } else if (errorObject.code == 11000) {
        // Duplicate Error
        errorResponse.statusCode = HttpResponse.BAD_REQUEST;
        errorResponse.response.message = "Username has been taken!";
      } else 
      console.log(errorObject)

      return res.status(errorResponse.statusCode).json(errorResponse.response);
  });
}

export function authenticateAccount(req, res) {
  const { username, password } = req.body;
  AccountService
    .authenticateAccount(username, password)
    .then((response) => {
      return res.status(HttpResponse.OK).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'ValidationError') {
          errorResponse.statusCode = HttpResponse.BAD_REQUEST
          errorResponse.response.message = "Invalid Username and/or Password!"
      } else 
        console.log(errorObject)
      return res.status(errorResponse.statusCode).json(errorResponse.response);
  });
}

export function logoutAccount(req, res)  {
  const token = req.headers.authorization;
  AccountService
      .logoutAccount(token)
      .then((response) => {
          return res.status(HttpResponse.OK).json({
              status: true,
              response: { message: "Successfully logged account out!" },
          });
      })
      .catch((errorObject) => {
          const errorResponse = JSON.parse(serverErrorResponse)


          if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
              errorResponse.statusCode = HttpResponse.UNAUTHORIZED
              errorResponse.response.message = "Not Authorized to use service!"
          }else 
          console.log(errorObject)

          return res.status(errorResponse.statusCode).json(errorResponse.response);
      });
};


export function getHealthStatus(req, res) {
  res.status(HttpResponse.OK).json({
    status: "true",
    response: "operational"
  });
};


export function getAccounts(req, res) {
  const token = req.headers.authorization;
  AccountService.getAccounts(token)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
        errorResponse.statusCode = HttpResponse.UNAUTHORIZED
        errorResponse.response.message = "Not Authorized to use service!"
    } 
    else if (errorObject.name == 'InvalidPrivilegesError') {
        errorResponse.statusCode = HttpResponse.FORBIDDEN
        errorResponse.response.message = "Not able to perform service!"
    }else 
    console.log(errorObject)

    return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
}

export function getAccountById(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization;
  AccountService.getAccountById(token, id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'BadIdError' || errorObject.name == 'CastError') {
          errorResponse.statusCode = HttpResponse.NOT_FOUND
          errorResponse.response.message = "Invalid id supplied!"
      }

      else if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
          errorResponse.statusCode = HttpResponse.UNAUTHORIZED
          errorResponse.response.message = "Not Authorized to use service!"
      } else if (errorObject.name == 'InvalidPrivilegesError') {
          errorResponse.statusCode = HttpResponse.FORBIDDEN
          errorResponse.response.message = "Not able to perform service!"
      }else 
      console.log(errorObject)
      return res.status(errorResponse.statusCode).json(errorResponse.response);
    });
}

export function updateAccount(req, res) {
  const { id } = req.params;
  const { change } = req.body;
  const token = req.headers.authorization;

  AccountService.updateAccountById(token, id, change)
    .then((response) => {

      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'BadIdError' || errorObject.name == 'CastError') {
          errorResponse.statusCode = HttpResponse.NOT_FOUND
          errorResponse.response.message = "No such id found!"
      }

      else if (errorObject.name == 'BadBalanceError') {
        errorResponse.statusCode = HttpResponse.BAD_REQUEST
        errorResponse.response.message = "Invalid change amount!"
      }

      else if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
          errorResponse.statusCode = HttpResponse.UNAUTHORIZED
          errorResponse.response.message = "Not Authorized to use service!"
      } 
      else if (errorObject.name == 'InvalidPrivilegesError') {
          errorResponse.statusCode = HttpResponse.FORBIDDEN
          errorResponse.response.message = "Not able to perform service!"
      } else 
        console.log(errorObject)

      return res.status(errorResponse.statusCode).json(errorResponse.response);
  });
}

export function deleteAccount(req, res) {
  const { id } = req.params;
  const token = req.headers.authorization;
  AccountService.deleteAccountById(token, id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'BadIdError' || errorObject.name == 'CastError') {
          errorResponse.statusCode = HttpResponse.NOT_FOUND
          errorResponse.response.message = "No such id found!"
      }

      else if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
          errorResponse.statusCode = HttpResponse.UNAUTHORIZED
          errorResponse.response.message = "Not Authorized to use service!"
      } else if (errorObject.name == 'InvalidPrivilegesError') {
          errorResponse.statusCode = HttpResponse.FORBIDDEN
          errorResponse.response.message = "Not able to perform service!"
      }else 
      console.log(errorObject)

      return res.status(errorResponse.statusCode).json(errorResponse.response);
  });
}