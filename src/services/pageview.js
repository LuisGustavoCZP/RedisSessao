const redis = require("../clients/redis/redis");

async function savePage (userid, path) 
{
    const key = `pageview:user:${userid}`;
    await redis.lpush(key, path);
}

async function getPages (userid, last) 
{
    const key = `pageview:user:${userid}`;
    if(!last) 
    {
        return await redis.lrange(key, 0, -1);
    }
    else {
        return await redis.lrange(key, 0, last);
    }
}

module.exports = { savePage, getPages }