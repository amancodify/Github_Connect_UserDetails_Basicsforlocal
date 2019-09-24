var UserController = require("./controller/UserController");
var GitUserDetailsController = require("./controller/GitUserDetailsController");
var express = require("express");
var Router = express.Router();

Router.get("/", function (req, res) {
    res.json({
        "Status": "API is working fine!"
    });
});

Router.get("/usernames", async function (req, res) {
    res.json({ "d": await UserController.getUserNames() });
});

Router.get("/usernames/:id", async function (req, res) {
    res.json({ d: await UserController.getUserName(req.params.id) });
});

Router.post("/create", async function (req, res) {
    res.json({ d: await UserController.createUserName(req.body.Username) });
});

Router.put("/update/:id", async function (req, res) {
    res.json({ d: await UserController.updateUserName(req.params.id, req.body) });
});

Router.delete("/delete/:id", async function (req, res) {
    res.json({ d: await UserController.deleteUserName(req.params.id) });
});

Router.post("/createuserdetails", async function (req, res) {
    res.json({ d: await GitUserDetailsController.getUserDetails(req.body.Username) });
});

Router.get("/getusernamesbatch/", async function (req, res) {
    res.json({ d: await GitUserDetailsController.getusernamesbatch() });
});

exports.Router = Router;