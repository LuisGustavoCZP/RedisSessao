const passCheck = require("../services/checkpass");
const { selectUser, createUser } = require("../clients/postgres/users");
const { responseSucess, responseError } = require("../utils/response");
const { createSession } = require("../services/session");
const { getFail } = require("../services/failure");

async function login (req, res)
{
    const {username, password} = req.body;
    console.log("Executar login")
    let user = await selectUser(username);
    if(!user)
    {
        user = await createUser(username, password);
    }
    
    const failures = await getFail(user.id, "password");
    if(failures && failures.tries > 3) 
    {
        responseError(res, [`user: Tentativas foram excedidas, aguarde ${failures.expiration/1000} segundos`]);
        return;
    }

    const respPassCheck = await passCheck(user, password);
    if(respPassCheck) 
    {
        const session = await createSession(user.id);
        res.cookie("token", session.id);
        responseSucess(res, null);
    }
    else responseError(res, ["user: Senha errada"]);
}

module.exports = login;