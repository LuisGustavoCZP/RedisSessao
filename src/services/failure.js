const redis = require("../clients/redis/redis");

async function setFail (userid, type)
{
    const key = `failed:${type}:${userid}`;
    const hasFailed = await redis.exists(key);
    if(!hasFailed) 
    {
        const failed = {
            tries: 1,
            trytime: 0,
            lasttry: Date.now(),
            expiration: 30
        };
        await redis.hset(key, failed);
        await redis.expire(key, failed.expiration);
    }
    else 
    {
        let failed = await redis.hgetall(key);
        failed.tries++;
        const lasttry = failed.lasttry;
        failed.lasttry = Date.now();
        failed.trytime = failed.lasttry - lasttry;
        await redis.hset(key, failed);
        await redis.expire(key, failed.expiration);
    }
}

async function getFail (userid, type)
{
    const key = `failed:${type}:${userid}`;
    const hasFailed = await redis.exists(key);
    if(hasFailed) 
    {
        return await redis.hgetall(key);
    }
    return null;
}


module.exports = {setFail, getFail}