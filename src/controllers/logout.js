const { setLastAction } = require("../services/lastAction");
const { destroySession } = require("../services/session");

async function logout (req, res)
{
    const sess = req.session;
    if(sess)
    {
        setLastAction(req.user.id, "logout");
        await destroySession(sess.id);
    }
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = logout;