var UserService = require("../service/UserService");
var UserModel = require('../model/UserModel');
const axios = require('axios');
var lambda_urls = ["https://4nbczhjlk6.execute-api.us-east-2.amazonaws.com/default/GitHub_Connect_UserDetails_Ohio"];

async function getUserDetails(username, id, lambdaurl) {
    var userDetails;
    var alluserdetails = [];
    await axios.post(lambdaurl, {
        "username": username
    })
        .then(response => {
            userDetails = response.data
            if (userDetails != null) {
                var gituserdetail = new UserModel.UserDetails({
                    Name: userDetails.Name,
                    Email: userDetails.Email,
                    Description: userDetails.Description,
                    Profile_website: userDetails.Profile_website,
                    company: userDetails.company,
                    username: userDetails.username,
                    Repositories: userDetails.Repositories
                });
                alluserdetails.push(gituserdetail);
                return UserService.createUserDetails(alluserdetails, id);
            }
            else {
                console.log(`\x1b[31mError While fetching usernames from github..Resetting the date Range of id  into orignal state\x1b[37m \n\n`);
                console.log(`Lambda: [\x1b[36masdasd\x1b[37m] is down !!`);
                // await sendSignal(id);
                return UserService.revertUsernamesFlags(id);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

async function getSingleusername() {
    return await UserService.getoneUsername();
}

async function launch() {
    const oneuser = await getSingleusername();
    getUserDetails(oneuser.Username, oneuser._id, lambda_urls[0]);
}

launch()
exports.getUserDetails = getUserDetails;
exports.getSingleusername = getSingleusername;