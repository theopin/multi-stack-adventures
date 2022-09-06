import Helper from '../../database/helpers.js'
import AccountModel from '../models/accounts.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken, blacklistJwtToken } from './authentication.service.js';


export default class AccountService {
  static async createAccount(username, password, balance) {
    const hashedPassword = await hashPassword(password)

    return await Helper.save(AccountModel, {
      username,
      password: hashedPassword,
      balance,
      role: "user"
    })
  }

  static async authenticateAccount(username, password) {
    const matchingUser = await Helper.listOne(AccountModel, { username })
    if (!matchingUser)
      throw ({ name: 'BadUsernameError' })

    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
    if (!isEnteredPasswordValid)
      throw ({ name: 'BadPasswordError' })

    return createJwtToken(username, matchingUser.role);
  }

  static async logoutAccount(token) {
    const tokenData = await analyseJwtToken(token);
    await blacklistJwtToken(token, tokenData);
  }

  static async getAccountById(token, id) {
    const tokenDetails = await analyseJwtToken(token)
    return Helper.list(model, {
      _id: id,
    })
  }

  static async getAccounts(token) {
    const tokenDetails = await analyseJwtToken(token)

    return Helper.list(model, {})
  }

  static async updateAccountById(token, id, balance) {
    const tokenDetails = await analyseJwtToken(token, id)

    return Helper.updateOne({ _id: id, balance: balanceCheck}, {$inc : {balance}}, {new: true})
  }

  static async deleteAccountById(token, id) {
    const tokenDetails = await analyseJwtToken(token, id)

    return Helper.deleteOne(AccountModel, { id })
  }

}