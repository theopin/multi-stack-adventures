import AccessControl from 'accesscontrol';
import Helper from '../../database/helpers.js'
import AccountModel from '../models/accounts.model.js'
import { hashPassword, verifyHashPassword, createJwtToken, analyseJwtToken, blacklistJwtToken } from './authentication.service.js';
import { RolePermissions } from '../../constants/rolePermissions.js';

const ac = new AccessControl(RolePermissions);

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
    const tokenData = await analyseJwtToken(token)
    const permission = ac.can(tokenData.role).readOwn('account');
    if(!permission.granted)
      throw ({ name: 'InvalidPrivilegesError' });
    return Helper.list(AccountModel, {
      _id: id,
    })
  }

  static async getAccounts(token) {
    const tokenData = await analyseJwtToken(token)
    const permission = ac.can(tokenData.role).readAny('account');
    if(!permission.granted)
      throw ({ name: 'InvalidPrivilegesError' });

    return Helper.list(AccountModel, {})
  }

  static async updateAccountById(token, id, balance) {
    const tokenData = await analyseJwtToken(token, id)
    const permission = ac.can(tokenData.role).updateOwn('account');
    if(!permission.granted)
      throw ({ name: 'InvalidPrivilegesError' });
    return Helper.updateOne({ _id: id}, {$inc : {balance}}, {new: true})
  }

  static async deleteAccountById(token, id) {
    const tokenData = await analyseJwtToken(token, id)
    const permission = ac.can(tokenData.role).deleteOwn('account');
    if(!permission.granted)
      throw ({ name: 'InvalidPrivilegesError' });
    return Helper.deleteOne(AccountModel, { id })
  }

}