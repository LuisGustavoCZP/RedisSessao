const { getSession } = require("../services/session");

function sessionCheck (req, res)
{
    const {token:sessionid} = req.cookies;
    if(sessionid) 
    {
        const session = getSession(sessionid);
        req.session = session;
        //session.userid 
    }
    else return;
}

module.exports = {sessionCheck};