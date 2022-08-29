const mongoose = require("mongoose");
const helpers = require("../../database/helpers");
require("../models/accounts.model");
const model = mongoose.model("Account");

module.exports.createAccount = async (name, balance) => {
  return new Promise((resolve, reject) => {
    helpers
      .save(model, {
        name,
        balance
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};

module.exports.getAccountById = async (id) => {
  return new Promise((resolve, reject) => {
    helpers
      .list(model, {
        accountId: id,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};

module.exports.getAccounts = async () => {
  return new Promise((resolve, reject) => {
    helpers
      .list(model, {})
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};

module.exports.deleteAccount = async (id) => {
  console.log(id)
  return new Promise((resolve, reject) => {
    helpers
      .deleteOne(model, { accountId: id })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};

module.exports.updateAccount = async (id, change) => {
  const balanceCheck = (change > 0) ? {$gte: 0} : {$gte: Math.abs(change)}
  return new Promise((resolve, reject) => {
    helpers
      .update(model, { accountId: id, balance: balanceCheck}, {$inc : {balance : change}}, {new: true})
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
};
