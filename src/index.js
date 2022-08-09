const express = require("express");
const cookieParser = require('cookie-parser')
const { port } = require("./utils/configs");
const loginController = require("./controllers/login");
const logoutController = require("./controllers/logout");
const { sessionCheck } = require("./controllers/sessioncheck");
const app = express();

const parent = __dirname.replace(/\/(\w*)$/mi, '');
console.log(parent, __dirname);

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(sessionCheck);

app.post("/login", loginController);
app.get("/logout", logoutController);

app.get ("/login", async (req, res) => 
{
    const sess = req.session;
    if(sess)
    {
        res.redirect("/");
    }
    else res.sendFile(__dirname+"/public/login/index.html");
});

app.get ("/", async (req, res) =>
{
    const sess = req.session;
    if(sess)
    {
        res.write(`<h1>Welcome ${sess.id} </h1><br>`)
        res.write(
            `<h3>This is the Home page</h3>`
        );
        res.end('<a href=' + '/logout' + '>Click here to log out</a >')
    }
    else res.redirect("/login");
});

app.get ("/static/index.js", async (req, res) =>
{
    res.sendFile(__dirname+"/public/index.js");
});

app.get ("/static/style.css", async (req, res) =>
{
    res.sendFile(__dirname+"/public/style.css");
});

app.listen(port, () => 
{
    console.log(`Server started at http://localhost:${port}`)
});