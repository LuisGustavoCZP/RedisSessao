const fs = require('fs');

const parent = __dirname.replace(/\/(\w*)$/mi, '');

const loginPageFile = fs.readFileSync(parent+'/public/login/index.html');
const scriptFile = fs.readFileSync(parent+'/public/login/index.js');
const styleFile = fs.readFileSync(parent+'/public/style.css');

async function loginPage (req, res)
{
    const sess = req.session;
    if(sess)
    {
        res.redirect("/");
    }
    else 
    {
        res.write(`<style>${styleFile}</style>`);
        res.write(loginPageFile);
        res.write(`<script defer>${scriptFile}</script>`)
        res.end();
    }
}

module.exports = { loginPage };