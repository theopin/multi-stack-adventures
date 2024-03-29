
import Helper from '../../mongodb/helper.js'
import ObjectModel from '../models/objects.model.js'
import RedisInstance from '../../redis/instance.js';
import axios from 'axios'

const objectRedis = new RedisInstance();

export default class ObjectService {

  static async initializeData() {
    await Helper.deleteAll(ObjectModel);
    await objectRedis.flushAll();

    const apiResponse = await axios.get("http://jsonplaceholder.typicode.com/photos");
    await Helper.save(ObjectModel, apiResponse.data);
    return {
      results: apiResponse.data,
      message: "Cleared cache, pulled data from JSON server and populated database."
    };
  };

  static async getDataSetFromDatabase() {
    const dbResults = await Helper.list(ObjectModel, {});

    if (dbResults.length > 0)
      return {
        results: dbResults,
        message: "Retrieved data from MongoDB database."
      };

  };

  static async getDataSetFromRedis() {
    const redisResults = await objectRedis.getObject();
    
    if (redisResults)
      return {
        results: JSON.parse(redisResults),
        message: "Retrieved data from Redis Cache."
      };

    const apiResponse = await Helper.list(ObjectModel, {});
    const redisStatus = await objectRedis.setValues(JSON.stringify(apiResponse));
    if(!redisStatus == "OK")
      throw('InsertionError');

    return {
      results: apiResponse,
      message: "No data in Redis Cache. Pulled data from MongoDB and populated cache."
    };
  };

}