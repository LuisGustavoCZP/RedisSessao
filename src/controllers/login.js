const passCheck = require("../services/checkpass");
const { selectUser, createUser } = require("../clients/postgres/users");
const { responseSucess, responseError } = require("../utils/response");
const { createSession } = require("../services/session");

async function login (req, res)
{
    const {username, password} = req.body;
    console.log("Executar login")
    let user = await selectUser(username);
    if(!user)
    {
        user = await createUser(username, password);
    }
    
    const respPassCheck = await passCheck(user, password);
    if(respPassCheck) 
    {
        const session = await createSession(user.id);
        res.cookie("token", session.id);
        responseSucess(res, null);
    }
    else responseError(res, ["user: wrong password"]);
}

module.exports = login;