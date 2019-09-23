const mongoose = require('mongoose');
const usernamesSchema = new mongoose.Schema({
    Username: String,
    Timestamp: { type: Date, default: Date.now },
    isProcessed: Boolean,
    ProcessStarted: Boolean
});

const userdetailsSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Description: String,
    Profile_website: String,
    company: String,
    username: String,
    Repositories: Array,
    Timestamp: { type: Date, default: Date.now },
});

function totalUserDetails_count() {
    this.UserDetails.countDocuments({}, function (err, c) {
        if (err) {
            console.log('Error While fetching the usernames count !!', err);
        }
        else {
            console.log(`|\t\x1b[33mTotal ${c} Items Inserted till now !!\x1b[37m\t\t\t\t\t\t\t|`);
            console.log("-------------------------------------------------------------------------------------------------");
        }
    });
}

exports.Usernames = mongoose.model('Usernames', usernamesSchema);
exports.UserDetails = mongoose.model('GitUserDetails', userdetailsSchema);
exports.totalUserDetails_count = totalUserDetails_count;
