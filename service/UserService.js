const mongoose = require('mongoose');
var UserModel = require('../model/UserModel');
// mongoose.connect('mongodb://localhost/GitHub_DB', { useNewUrlParser: true })
    mongoose.connect('mongodb+srv://echo_github_write_access:lsozMgFfFq1vKoLc@cluster0-yjgj9.mongodb.net/github?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Cannot connect to DB', err))

exports.createUserDetails = async function (userdetails, id, username) {
    return await UserModel.UserDetails.create(userdetails, (err) => {
        if (err) {
            console.log("Error while Inserting into MongoDB:", err.code);
            if(err.code == 11000)
            {
                exports.updateUsernamesFlags(id);
            }
            else
            {
                exports.revertUsernamesFlags(id);
            }
            
        }
        else {
            console.log("-------------------------------------------------------------------------------------------------");
            console.log("|\tCurrent user Fetched from MongoDB-------------------> [\x1b[36m", username, "\x1b[37m]");
            console.log(`|\t\x1b[32mHurry!! Details of the user \x1b[32m inserted successfully into MongoDB...\x1b[37m\t\t\t|`);
            UserModel.totalUserDetails_count();
            exports.updateUsernamesFlags(id);
        }
    });
}

exports.updateUsernamesFlags = async function (id) {
    return await UserModel.Usernames.updateOne({ _id: id }, {
        $set: { "isProcessed": true, }
    });
}

exports.revertUsernamesFlags = async function (id) {
    return await UserModel.Usernames.updateOne({ _id: id }, {
        $set: { "isProcessed": false, "ProcessStarted": false }
    });
}

exports.updateBrokenUsernames = async function () {
    return await UserModel.Usernames.updateMany({ ProcessStarted: true, isProcessed: false }, {
        $set: { "ProcessStarted": false, "isProcessed": false }
    });
}

exports.getusernamesbatch = async function (num) {
    var usersbatch = await UserModel.Usernames.find({ "ProcessStarted": false, "isProcessed": false }).limit(num);
    if (usersbatch == null || undefined) {
        console.log("All Usernames Processed, the Stack is Empty !!");
    }
    else {
        for (let i = 0; i < usersbatch.length; i++) {
            await UserModel.Usernames.updateOne({ _id: usersbatch[i]._id }, {
                $set: { "ProcessStarted": true }
            });
        }
        return usersbatch;
    }
}