const accountsService = require("../services/account.service");

module.exports.createAccount = (req, res) => {
  const { name, balance } = req.body;
  accountsService
    .createAccount(name, balance)
    .then((response) => {
      return res.status(201).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
};

module.exports.getAccountById = (req, res) => {
  const { id } = req.params;
  accountsService
    .getAccountById(id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
};

module.exports.getAccounts = (req, res) => {
  accountsService
    .getAccounts()
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
};

module.exports.deleteAccount = (req, res) => {
  const { id } = req.params;
  accountsService
    .deleteAccount(id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
};

module.exports.updateAccount = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  accountsService
    .updateAccount(id, name, email)
    .then((response) => {
      return res.status(200).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
};
