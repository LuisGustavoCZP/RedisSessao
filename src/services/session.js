const redis = require("../clients/redis/redis");
const uuid = require("../utils/uuid");

async function createSession (userid)
{
    const session = {
        id:uuid(),
        userid:userid
    }
    const key = `session:${session.id}`;
    await redis.hset(key, session);
    await redis.expire(session.id, 60*15);

    return session;
}

async function destroySession (sessionid)
{
    const key = `session:${sessionid}`;
    await redis.del(key);
}

async function getSession (sessionid)
{
    const key = `session:${sessionid}`;
    return await redis.hgetall(key);
}

module.exports = {createSession, destroySession, getSession}