var UserService = require("../service/UserService");
var UserModel = require('../model/UserModel');
const axios = require('axios');
var random_time = Math.floor(Math.random() * (300000 - 240000) + 240000);
var refreshIntervalId = null;
var deathCount = [];
var lambda_urls = ["https://aov10rahuf.execute-api.us-east-2.amazonaws.com/default/Github_ConnectEcho",
    "https://o642vaw0aa.execute-api.ap-south-1.amazonaws.com/default/Github_ConnectMumbai",
    "https://40wwc845uk.execute-api.us-east-1.amazonaws.com/default/Github_ConnectVirginia",
    "https://g8dwd3zyk0.execute-api.us-west-1.amazonaws.com/default/Github_ConnectCalifornia",
    "https://icdk11vpwj.execute-api.ap-southeast-1.amazonaws.com/default/Github_ConnectSingapore",
    "https://ns3cduxb0d.execute-api.ap-northeast-1.amazonaws.com/default/Github_ConnectTokyo",
    "https://2m0ch1pu6e.execute-api.eu-west-2.amazonaws.com/default/Github_ConnectLondon"];

async function getUsernames(country, datefrom, todate, id, lambdaUrl) {
    var usernameArray = [];
    var allObjs = [];
    await axios.post(lambdaUrl, {
        "country": country,
        "dateFrom": datefrom,
        "dateTo": todate
    })
        .then(async function (response) {
            usernameArray = await response.data;
            if (usernameArray.length > 0) {    
                for (let i = 0; i < usernameArray.length; i++) {
                    var usernames = new UserModel.Usernames({
                        Username: usernameArray[i],
                        isProcessed: false,
                        ProcessStarted: false
                    });
                    allObjs.push(usernames); 
                }
                return await UserService.createUserName(allObjs, id, datefrom, todate);
            }
            else {
                console.log(`\x1b[31mError While fetching usernames from github..Resetting the date Range of id ${id} into orignal state\x1b[37m \n\n`);
                console.log(`Lambda: [\x1b[36m${lambdaUrl}\x1b[37m] is down !!`);
                await sendSignal(id);
                return await UserService.revertDateFlags(id);
            }
        })
        .catch(async function (error) {
            console.log(error.response.data.message);
            console.log("Lambda Down: ", lambdaUrl);
            return await UserService.revertDateFlags(id);
            // console.log(error.response);
        });

    
}

async function get7dates() {
    var datesarray;
    const url = 'http://localhost:3000/api/get7date'
    await axios.get(url)
        .then(res => {
            datesarray = res.data.d;
        })
        .catch(err => {
            console.log(err);
        });
    return datesarray;
}

async function sendSignal(id) {
    if (deathCount.includes(id)) {
        return 0;
    }
    else {
        deathCount.push(id);
        return await UserService.revertDateFlags(id);
    }
}

function intervalManager(flag, fname, time) {
    if (flag)
        refreshIntervalId = setInterval(fname, time);
    else
        clearInterval(refreshIntervalId);
}

function restart() {
    setTimeout(() => {
        console.log("\nRestarting. . .\n");
        intervalManager(true, launch, random_time);
    }, 900000*8);
}

function emptyDeathCount(){
    deathCount = [];
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
  }

async function launch() {
    if (deathCount.length >= 7) {
        console.log("\n*************************All Lambda Servers Dead. . .Time to wait !!**************************\n")
        intervalManager(false);
        restart();
        emptyDeathCount();
        return await UserService.updateBrokenDates();
    }
    else {
        const dates = await get7dates();
        const shuffledlambda = await shuffle(lambda_urls);
        for (let i = 0; i < lambda_urls.length; i++) {
            await getUsernames("india", dates[i].from, dates[i].to, dates[i]._id, shuffledlambda[i]);
        }
    }
}

intervalManager(true, launch, random_time);
exports.getUsernames = getUsernames;