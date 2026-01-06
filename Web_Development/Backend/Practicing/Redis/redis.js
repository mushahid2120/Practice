import redis from 'redis'

const redisClient=redis.createClient({url: 'redis://192.168.43.144'})

redisClient.on('error',(error)=>{
    console.log("Redis Client Error",error)
    process.exit(1)
})

redisClient.connect()

// const result=await redisClient.get('user')
// const result =await redisClient.json.set("Animal","$",{name: "Elephant",type: 'omnivorous'})
// const result =await redisClient.json.get('Animal',{path: '$.name'})
// const result =await redisClient.json.arrAppend('student','$.hobbies',"Football")
// const result=await redisClient.json.arrPop('student',{path: '$.hobbies'})
const result =await redisClient.json.get('student',{path: "$.hobbies[*]"})

console.log(result)

await redisClient.quit()
