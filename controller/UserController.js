var UserService = require("../service/UserService");
var UserModel = require('../model/UserModel');

exports.getUserNames = async function () {
    return await UserService.getUserNames();
}

exports.getUserName = async function (id) {
    return await UserService.getUserName(id);
}

exports.createUserName = async function (gitusername) {
    const usernames = new UserModel.Usernames({
        Username: gitusername,
        isProcessed: false,
        ProcessStarted: false
    });

    return await UserService.createUserName(usernames);
}

exports.updateUserName = async function (id,data) {
    return await UserService.updateUserName(id,data);
}

exports.deleteUserName = async function (id) {
    return await UserService.deleteUserName(id);
}