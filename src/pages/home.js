const fs = require('fs');
const { savePage, getPages } = require('../services/pageview');
const { getLastAction } = require('../services/lastAction');

const parent = __dirname.replace(/\/(\w*)$/mi, '');

const homePageFile = fs.readFileSync(parent+'/public/index.html');
const styleFile = fs.readFileSync(parent+'/public/style.css');
const scriptFile = fs.readFileSync(parent+'/public/index.js');

async function homePage (req, res)
{
    const sess = req.session;
    if(sess)
    {
        const user = req.user;
        savePage(user.id, req.originalUrl);
        const pvw = await getPages(user.id, 10);
        const la = await getLastAction(user.id);
        res.write(`<style>${styleFile}</style>`);
        const s = `
        <script defer>
            window.user = ${JSON.stringify(user)};
            window.pageviews = ${JSON.stringify(pvw)};
            window.lastaction = "${la}";
        </script>`;
        res.write(homePageFile);
        res.write(s);
        res.write(`<script defer>${scriptFile}</script>`)
        res.end();
    }
    else res.redirect("/login");
}

module.exports = {homePage, homePageFile};