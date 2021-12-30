const axios = require("axios");
const redis = require("redis");

const redisClient = redis.createClient();
const cityEndpoint = () => `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`
const getWeather = async (city) => {
    //Check if its on Cache 
    let cacheEntry = await redisClient.get(`weather-${city}`)
    if (cacheEntry) {
        cacheEntry = JSON.parse(cacheEntry)
        return { ...cacheEntry, "source": "cache" }
    }
    let apiResponse = await axios.get(cityEndpoint(city))
    redisClient.set(`weather-${city}`, JSON.stringify(apiResponse.data), "EXP", 3600)
    return {...apiResponse.data, 'source': "API"}
}

const t0 = new Date().getTIme()
let weather = await getWeather("lagos")
const t1 = new Date().getTime()
weather.responseTime = `${t1- t0}`
console.log(weather)