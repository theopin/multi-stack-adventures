
import Helper from '../../database/helpers.js'
import AccountModel from '../models/accounts.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken, blacklistJwtToken } from './authentication.service.js';
import dotenv from 'dotenv';
dotenv.config();

export default class AccountService {
  static async createAccount(username, password, balance) {

    if (password.length != 6 || isNaN(password))
      throw ({ name: 'ValidationError' })
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
      throw ({ name: 'ValidationError' })

    const isEnteredPasswordValid = await verifyHashPassword(password, matchingUser.password)
    if (!isEnteredPasswordValid)
      throw ({ name: 'ValidationError' })

    return createJwtToken(matchingUser._id.toString(), username, matchingUser.role);
  }

  static async logoutAccount(token) {
    const tokenData = await analyseJwtToken(token);
    await blacklistJwtToken(token, tokenData);
  }

  static async getAccounts(token) {
    const tokenData = await analyseJwtToken(token)
    // if(tokenData.role != 'admin')
    //   throw ({ name: 'InvalidPrivilegesError' });

    return Helper.list(AccountModel, {})
  }

  static async getAccountById(token, id) {
    const tokenData = await analyseJwtToken(token)
    // if(tokenData.role != 'admin' && id != tokenData.id)
    //   throw ({ name: 'InvalidPrivilegesError' });
    const searchResult = await Helper.list(AccountModel, {
      _id: id,
    })
    if (searchResult.length == 0)
      throw ({ name: 'BadIdError' })
    return searchResult
  }

  static async updateAccountById(token, _id, change) {
    const tokenData = await analyseJwtToken(token, _id)
    // if(tokenData.role != 'admin' && id != tokenData.id)
    //   throw ({ name: 'InvalidPrivilegesError' });
    const opValidation = change >= 0 ? { _id} :{ _id, balance: { $gte: Math.abs(change) }}
    const updateResult = await Helper.updateOne(AccountModel, opValidation, { $inc: { balance: change } }, { new: true })

    if (!updateResult && change < 0) 
      throw({ name: 'BadBalanceError' })
    else if (!updateResult)
      throw ({ name: 'BadIdError' })
    return updateResult
  }

  static async deleteAccountById(token, id) {
    const tokenData = await analyseJwtToken(token, id)
    // if(tokenData.role != 'admin' && id != tokenData.id)
    //   throw ({ name: 'InvalidPrivilegesError' });
    const deleteResult = await Helper.deleteOne(AccountModel, { _id: id })
    if (deleteResult && deleteResult.deletedCount == 0)
      throw ({ name: 'BadIdError' })
    if (tokenData.id == id)
      await blacklistJwtToken(token, tokenData);
    return deleteResult
  }

}