import redis, { SCHEMA_FIELD_TYPE } from "redis";

const redisClient = redis.createClient({
  username: "default",
  password: "tK6l5ClHt0xUULOADRYsOqcWGR3MPkxT",
  socket: {
    host: "redis-18490.crce182.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 18490,
  },
});

redisClient.on("error", (error) => {
  console.log("Redis Client Error", error);
  process.exit(1);
});

redisClient.connect();

// const result=await redisClient.get('user')
// const result =await redisClient.json.set("Animal","$",{name: "Elephant",type: 'omnivorous'})
// const result =await redisClient.json.get('Animal',{path: '$.name'})
// const result =await redisClient.json.arrAppend('student','$.hobbies',"Football")
// const result=await redisClient.json.arrPop('student',{path: '$.hobbies'})
// const result =await redisClient.json.get('student',{path: "$.hobbies[*]"})

// for(let i=0;i<redisData.length;i++)
//     await redisClient.json.set(`user:${i}`,"$",redisData[i])

const indexes=await redisClient.ft._list()

// const result = await redisClient.ft.create(
//   "cityIdx1",
//   {
//     "$.city": { type: SCHEMA_FIELD_TYPE.TAG, AS: "city" },
//   },
//   {
//     ON: "JSON",
//     PREFIX: "user",
//   }
// );

// const citySearch=await redisClient.ft.search('cityIdx',"@city:{Lucknow}")
// const citySearch=await redisClient.ft.search('ageIdx',"@age:[20 40]")
// const result =await redisClient.ft.dropIndex('cityIdx1')
console.log(indexes);

await redisClient.quit();
