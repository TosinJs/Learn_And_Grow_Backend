const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => console.log(err))

//Set and Get
client.set("transactions", 123, redis.print);
client.get("transactions", redis.print);
client.get("name", redis.print);

//Delete Items
client.del("name", redis.print);
client.get("name", redis.print);

//Incr and Decr
client.set("counter", 50, redis.print)
client.decr("counter", redis.print)
client.get("counter", redis.print)

//Set Expiry With TTl
client.set("test", "val", "EX", 5, redis.print)
client.get("test", redis.print)

//LISTS
client.del("transactions")
client.rpush("transactions", 1,2,3,4, redis.print)
client.lrange("transactions", 0, -1, redis.print)

//Queues = Push Using LPUSH, and Extract Using RPOP
//Stacks = Push using RPUSH, and extract using RPOP

//Keyspace Operations
client.get("count", redis.print)

//Hashmaps (Basically Objects)
client.hset("transaction:123", 
    "transactionId", 123, 
    "type", "PURCHASE",
    "amount", 50,
    client.print
)

client.hgetall("transaction:123", redis.print)
client.hget("transaction:123", "amount", redis.print)

//Sorted Sets - Great for leaderboards
client.zadd("scores", 900, "player1", redis.print);
client.zadd("scores", 998, "player2", redis.print);
client.zadd("scores", 990, "player3", redis.print);

client.zrange("scores", 0, -1, redis.print)
client.zrevrange("scores", 0, -1, redis.print)

