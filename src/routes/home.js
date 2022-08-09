const fs = require('fs');

const parent = __dirname.replace(/\/(\w*)$/mi, '');
console.log(parent, __dirname);

const homePageFile = fs.readFileSync(parent+'/public/index.html');

async function homePage (req, res)
{
    const sess = req.session;
    if(sess)
    {
        const user = req.user;
        const s = `
        <script>
            window.user = ${JSON.stringify(user)};
            document.getElementById("title").innerText = "Bem Vindo " + user.username;
        </script>`;
        res.write(homePageFile);
        res.write(s);
        res.end();
    }
    else res.redirect("/login");
}

module.exports = {homePage, homePageFile};