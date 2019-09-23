const mongoose = require('mongoose');
var UserModel = require('../model/UserModel');
mongoose.connect('mongodb://localhost/GitHub_DB', { useNewUrlParser: true })
    //mongoose.connect('mongodb+srv://echo_github_write_access:Dbn47XMj9KouRgmA@cluster0-yjgj9.mongodb.net/github?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...\n'))
    .catch(err => console.error('Cannot connect to DB', err))

// exports.getUserNames = async function () {
//     return await UserModel.Usernames.find();
// }

// exports.getUserName = async function (id) {
//     return await UserModel.Usernames.findById(id);
// }

exports.createUserDetails = async function (userdetails, id) {
    return await UserModel.UserDetails.create(userdetails, (err) => {
        if (err) {
            console.log("Error in Inserting into MongoDB:", err);
            exports.revertUsernamesFlags(id);
        }
        else {
            var leng = userdetails.length;
            console.log(`|\t\x1b[32mHurry!! ${leng} \x1b[32mgithub UserDetail inserted successfully into MongoDB...\x1b[37m\t\t\t|`);
            UserModel.totalUserDetails_count();
            exports.updateUsernamesFlags(id);
        }
    });
}

// exports.updateUserName = async function (id, data) {
//     return await UserModel.Usernames.update({ _id: id }, {
//         $set: data
//     });
// }

// exports.deleteUserName = function (id) {
//     return UserModel.Usernames.remove({ _id: id });
// }

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

exports.getoneUsername = async function () {
    var oneuser = await UserModel.Usernames.findOne({ "ProcessStarted": false, "isProcessed": false });
    if (oneuser == null || undefined) {
        console.log("All Usernames Processed, the Stack is Empty !!");
    }
    else {
        console.log("-------------------------------------------------------------------------------------------------");
        console.log("|\tCurrent user Fetched from MongoDB----------------> [\x1b[36m", oneuser.Username, "\x1b[37m] \t\t\t|");
        await UserModel.Usernames.updateOne({ _id: oneuser._id }, {
            $set: { "ProcessStarted": true }
        });
        return oneuser;
    }
}


// exports.get7Dates = async function () {
//     var dates = await UserModel.Datesrange.find({ "isStarted": false, "isCompleted": false }).limit(7);
//     if (dates == null || undefined){
//         console.log("All Date Ranges Processed, the Stack is Empty !!");
//     }
//     else{
//         for(let i=0; i<dates.length; i++)
//         {
//             await UserModel.Datesrange.updateOne({ _id: dates[i]._id }, {
//                 $set: { "isStarted": true }
//             });
//             // console.log(dates[i]._id);
//         }
//     return dates;
//     }
// }

exports.updateBrokenUsernames = async function () {
    return await UserModel.Usernames.updateMany({ ProcessStarted: true, isProcessed: false }, {
        $set: { "ProcessStarted": false, "isProcessed": false }
    });
}