const redis = require("../clients/redis/redis");

async function setLastAction (userid, action) 
{
    const key = `lastaction:user:${userid}`;
    await redis.set(key, action);
}

async function getLastAction (userid) 
{
    const key = `lastaction:user:${userid}`;
    return await redis.get(key);
}

module.exports = { setLastAction, getLastAction }