const redis = require("../clients/redis/redis");
const uuid = require("../utils/uuid");

async function createSession (userid)
{
    const session = {
        id:uuid(),
        userid:userid
    }
    await redis.hset(session.id, session);
    await redis.expire(session.id, 60*15);

    return session;
}

async function getSession (sessionid)
{
    return await redis.hgetall(sessionid);
}

module.exports = {createSession, getSession}