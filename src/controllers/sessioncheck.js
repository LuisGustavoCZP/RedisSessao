const { getSession } = require("../services/session");

async function sessionCheck (req, res, next)
{
    const {token:sessionid} = req.cookies;
    if(sessionid) 
    {
        const session = await getSession(sessionid);
        req.session = session;
        //console.log(sessionid, session);
    }
    next();
}

module.exports = {sessionCheck};