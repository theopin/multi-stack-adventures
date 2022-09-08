import { startRedisClient } from './setup.js'

export default class RedisInstance {
    constructor() {
        this.getRedisClient()
    }

    async getRedisClient() {
        this.redisClient = await startRedisClient()
    }
    async getObject() {
        const result =  await this.redisClient.GET("values");
        return result
    } 

    async flushAll() {
        return await this.redisClient.FLUSHALL();
    } 

    async setValues(array) {
        return await this.redisClient.SETEX("values", 30, array);
    } 

}