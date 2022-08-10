const loginController = require("./login");
const logoutController = require("./logout");
const { sessionCheck } = require("./sessioncheck");

module.exports = {loginController, logoutController, sessionCheck}