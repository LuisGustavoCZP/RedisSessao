const { getSession } = require("../services/session");

function sessionCheck (req, res, next)
{
    const {token:sessionid} = req.cookies;
    if(sessionid) 
    {
        const session = getSession(sessionid);
        req.session = session;
        //session.userid 
    }
    next();
}

module.exports = {sessionCheck};