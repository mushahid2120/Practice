import  { createClient } from 'redis';

const redisClient=await createClient({
    username: 'default',
    password: 'yZBmdTZLPYpjqzJubXdL7inIBxEnZ5Sq',
    socket: {
        host: 'redis-17844.c264.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 17844
    }});

redisClient.on('error',(error)=>{
    console.log("Redis Client Error",error)
    process.exit(1)
})

redisClient.connect()
console.log("connected to Redis")
export default redisClient;

