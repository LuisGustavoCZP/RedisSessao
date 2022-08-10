const fs = require('fs');
const { savePage } = require('../services/pageview');

const parent = __dirname.replace(/\/(\w*)$/mi, '');

const navs = {
    "/test1":'<a href="/test1">Teste 1</a>',
    "/test2":'<a href="/test2">Teste 2</a>',
    "/test3":'<a href="/test3">Teste 3</a>',
}

const styleFile = fs.readFileSync(parent+'/public/style.css');
async function testPage (req, res)
{
    const sess = req.session;
    if(sess)
    {
        const user = req.user;
        savePage(user.id, req.originalUrl);
        res.write(`<style>${styleFile}</style>`);
        const ns = Object.keys(navs).filter(key => key != req.originalUrl).reduce((txt, key) => {return txt+navs[key]}, '');
        res.write(`<header>
            <h1>Pagina de ${req.path}</h1>
            <nav>
            <a href="/">Home</a>
            ${ns}
            </nav>
        </header>`);
        res.end();
    }
    else res.redirect("/login");
}

module.exports = { testPage };