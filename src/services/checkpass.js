const bcrypto = require("../utils/bcrypto");

async function passwordFailed (userid)
{

}

async function check (user, password)
{
    if(bcrypto.check(password, user.password))
    {
        return true;
    }
    await passwordFailed(user.id);
    return false;
}

module.exports = check;