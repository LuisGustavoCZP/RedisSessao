const { getSession } = require("../services/session");
const { getUser } = require("../services/user");

async function sessionCheck (req, res, next)
{
    const {token:sessionid} = req.cookies;
    if(sessionid) 
    {
        const session = await getSession(sessionid);
        if(session.id)
        {
            req.session = session;
            req.user = await getUser(session.userid);
        }
    }
    next();
}

module.exports = {sessionCheck};