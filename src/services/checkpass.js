const bcrypto = require("../utils/bcrypto");
const { setFail } = require("./failure");


async function check (user, password)
{
    if(await bcrypto.check(password, user.password))
    {
        return true;
    }
    await setFail(user.id, "password");
    return false;
}

module.exports = check;