
import Helper from '../../database/helpers.js'
import AccountModel from '../models/accounts.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken, blacklistJwtToken } from './authentication.service.js';
import dotenv from 'dotenv';
dotenv.config();

export default class AccountService {
  static async createAccount(username, password, balance) {

    if (password.length != 6 && isNaN(password))
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

  static async getAccountById(token, id) {
    const tokenData = await analyseJwtToken(token)
    // if(tokenData.role != 'admin' && id != tokenData.id)
    //   throw ({ name: 'InvalidPrivilegesError' });
      return Helper.list(AccountModel, {
      _id: id,
    })
  }

  static async getAccounts(token) {
    const tokenData = await analyseJwtToken(token)
    // if(tokenData.role != 'admin')
    //   throw ({ name: 'InvalidPrivilegesError' });

    return Helper.list(AccountModel, {})
  }

  static async updateAccountById(token, id, balance) {
    const tokenData = await analyseJwtToken(token, id)
    // if(tokenData.role != 'admin' && id != tokenData.id)
    //   throw ({ name: 'InvalidPrivilegesError' });
    return Helper.updateOne(AccountModel,{ _id: id}, {$inc : {balance}}, {new: true})
  }

  static async deleteAccountById(token, id) {
    const tokenData = await analyseJwtToken(token, id)
    // if(tokenData.role != 'admin' && id != tokenData.id)
    //   throw ({ name: 'InvalidPrivilegesError' });
    const deleteResult = await Helper.deleteOne(AccountModel, { id })
    await blacklistJwtToken(token, tokenData);
    return deleteResult
  }

}