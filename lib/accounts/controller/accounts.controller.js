import AccountService from "../services/accounts.service.js";

export function createAccount(req, res) {
  const { name, balance } = req.body;
  AccountService.createAccount(name, balance)
    .then((response) => {
      return res.status(201).json({
        status: true,
        response,
      });
    })
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
}

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

export function deleteAccount(req, res) {
  const { id } = req.params;
  AccountService.deleteAccount(id)
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
    .catch((err) => {
      return res.status(500).json({ status: false, err });
    });
}
