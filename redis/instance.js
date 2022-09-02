import { startRedisClient } from './setup.js'

export default class RedisInstance {
    constructor() {
        this.getRedisClient()
    }

    async getRedisClient() {
        this.redisClient = await startRedisClient()
    }
    async getObject() {
        const result =  await this.redisClient.GET("stored");
        return result
    } 

    async flushAll() {
        const result =  await this.redisClient.FLUSHALL();
        console.log(result)

        return result
    } 

    async setValues(array) {
        return await this.redisClient.SET("stored", array);
    } 

}