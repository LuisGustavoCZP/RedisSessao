const postgres = require("../clients/postgres/postgres");

async function getUser (userid)
{
    const resp = await postgres.query("SELECT id,username FROM users WHERE id=$1", [userid]);
    return resp.rows[0];
}

module.exports = { getUser }