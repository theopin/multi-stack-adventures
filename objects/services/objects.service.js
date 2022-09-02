
import Helper from '../../mongodb/helper.js'
import ObjectModel from '../models/objects.model.js'
import RedisInstance from '../../redis/instance.js';
import axios from 'axios'

const objectRedis = new RedisInstance();

export default class ObjectService {

  static async insertData() {
    const response = await axios.get("http://jsonplaceholder.typicode.com/photos");
    const insertableData = response.data.map((obj => ({id: obj.id, url: obj.url})));
    await Helper.deleteAll(ObjectModel);
    await objectRedis.flushAll();

    await Helper.save(ObjectModel, insertableData);

    const redisStatus = await objectRedis.setValues(JSON.stringify(insertableData));
    if(!redisStatus == "OK")
      throw('InsertionError');
    // run command to insert many into db
  };

  static async getDataSetFromDatabase() {
    return await Helper.list(ObjectModel, {});
  };

  static async getDataSetFromRedis() {
    return await objectRedis.getObject();
  }
}