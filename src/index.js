const express = require("express");
const cookieParser = require('cookie-parser');
const { port } = require("./utils/configs");

const { loginController, logoutController, sessionCheck } = require("./controllers");
const { homePage, loginPage, testPage } = require("./pages");

const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(sessionCheck);

app.post("/login", loginController);
app.get("/logout", logoutController);

app.get ("/login", loginPage);
app.get ("/", homePage);
app.get ("/test1", testPage);
app.get ("/test2", testPage);
app.get ("/test3", testPage);

app.listen(port, () => 
{
    console.log(`Server started at http://localhost:${port}`)
});