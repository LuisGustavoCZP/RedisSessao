const postgres = require("./postgres");
const bcrypto = require("../../utils/bcrypto");

async function selectUser (username)
{
    const resp = await postgres.query('SELECT * FROM users WHERE username=$1', [username]);
    if(resp.rows.length > 0)
    {
        return resp.rows[0];
    }
    return null;
}

async function createUser (username, password)
{
    const pass = await bcrypto.generate(password);
    const resp = await postgres.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, pass]);
    if(resp.rows.length > 0)
    {
        return resp.rows[0];
    }
    return null;
}

module.exports = { selectUser, createUser };