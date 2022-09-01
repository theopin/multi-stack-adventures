import Helper from '../../database/helpers.js'
import AccountModel from '../models/accounts.model.js'

export default class AccountService {
  static async createAccount(name, balance) {
    return await Helper.save(AccountModel, {
      name,
      balance
    })
  }

  static async authenticateUser(username, password) {

  }

  static async logoutUser(token) {}

  static async getAccountById(id, token, username) {
    return Helper.list(model, {
      accountId: id,
    })
  }

  static async getAccounts(token) {
    return Helper.list(model, {})
  }

  static async updateAccountById(id, token, username, password) {
    return Helper.updateOne({ accountId: id, balance: balanceCheck}, {$inc : {balance : change}}, {new: true})
  }

  static async deleteAccountById(id, token, username) {
    return Helper.deleteOne(AccountModel, { id })
  }

}