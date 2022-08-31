
import Helper from '../../mongodb/helper.js'
import ObjectModel from '../models/objects.model.js'
import RedisInstance from '../../redis/instance.js';
import axios from 'axios'

const objectRedis = new RedisInstance();
const KEY_VALUE = "valid"

export default class ObjectService {

  static async insertData() {
    const data = await axios.get("http://jsonplaceholder.typicode.com/photos")
    console.log(data)
    // run command to insert many into db
    // run command to insert many into redis
  };

  static async getDataFromDatabase() {
    //run get objects from database
  };

  static async getDataFromRedis() {
    //run get objects from redis
  }
}