import Helper from '../../database/helpers.js'
import AccountModel from '../models/accounts.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken, blacklistJwtToken } from './authentication.service.js';


export default class AccountService {
  static async createAccount(username, password, balance) {
    const hashedPassword = await hashPassword(password)

    return await Helper.save(AccountModel, {
      username,
      password: hashedPassword,
      balance
    })
  }

  static async authenticateAccount(username, password) {
    const matchingUser = await Helper.listOne(AccountModel, { username })
    if (!matchingUser)
      throw ({ name: 'BadUsernameError' })

    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
    if (!isEnteredPasswordValid)
      throw ({ name: 'BadPasswordError' })

    return createJwtToken(username);
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