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
          errorResponse.response.message = "Username and/or Password are missing!"
      }

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
          errorResponse.response.message = "Username and/or Password are missing!"
      }

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
          }

          return res.status(errorResponse.statusCode).json(errorResponse.response);
      });
};


export function  getHealthStatus(req, res) {
  res.status(HttpResponse.OK).json({
    status: "true",
    response: "operational"
  });
};

export function getAccountById(req, res) {
  const { id } = req.params;
  AccountService.getAccountById(id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
}

export function getAccounts(req, res) {
  AccountService.getAccounts()
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
}

export function updateAccount(req, res) {
  const { id } = req.params;
  const { change } = req.body;
  AccountService.updateAccount(id, change)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'ValidationError') {
          errorResponse.statusCode = HttpResponse.BAD_REQUEST
          errorResponse.response.message = "Password is missing!"
      }
      else if (errorObject.name == 'BadUsernameError') {
          errorResponse.statusCode = HttpResponse.NOT_FOUND
          errorResponse.response.message = "No such Id found for update!"
      }

      else if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
          errorResponse.statusCode = HttpResponse.UNAUTHORIZED
          errorResponse.response.message = "Not Authorized to use service!"
      } 
      else if (errorObject.name == 'InvalidPrivilegesError') {
          errorResponse.statusCode = HttpResponse.FORBIDDEN
          errorResponse.response.message = "Not able to perform service!"
      }

      return res.status(errorResponse.statusCode).json(errorResponse.response);
  });
}

export function deleteAccount(req, res) {
  const { id } = req.params;
  AccountService.deleteAccount(id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((errorObject) => {
      const errorResponse = JSON.parse(serverErrorResponse)
      if (errorObject.name == 'BadIdError') {
          errorResponse.statusCode = HttpResponse.NOT_FOUND
          errorResponse.response.message = "Invalid id supplied for deletion!"
      }

      else if (errorObject.name == 'TokenExpiredError' || errorObject.name == 'JsonWebTokenError') {
          errorResponse.statusCode = HttpResponse.UNAUTHORIZED
          errorResponse.response.message = "Not Authorized to use service!"
      } else if (errorObject.name == 'InvalidPrivilegesError') {
          errorResponse.statusCode = HttpResponse.FORBIDDEN
          errorResponse.response.message = "Not able to perform service!"
      }

      return res.status(errorResponse.statusCode).json(errorResponse.response);
  });
}