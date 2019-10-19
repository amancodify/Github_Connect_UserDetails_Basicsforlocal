const mongoose = require('mongoose');
const usernamesSchema = new mongoose.Schema({
    Username: String,
    Timestamp: { type: Date, default: Date.now },
    isProcessed: Boolean,
    ProcessStarted: Boolean
});

const userdetailsSchema = new mongoose.Schema({
    name: String,
    email: String,
    bio: String,
    location : String,
    blog: String,
    company: String,
    login: { type: String, unique: true },
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,
    hireable: Boolean,
    created_at: Date,
    updated_at: Date,
    type: String,
    site_admin: Boolean,
    Repositories: Array,
    Timestamp: { type: Date, default: Date.now },
    Linked_to_CSV: {type: Boolean, default: false},
});

function totalUserDetails_count() {
    this.UserDetails.countDocuments({}, function (err, c) {
        if (err) {
            console.log('Error While fetching the usernames count !!', err);
        }
        else {
            console.log(`|\t\x1b[33mTotal ${c} Items Inserted till now !!\x1b[37m\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|`);
            console.log("-----------------------------------------------------------------------------------------------------------------------------------------------------------------");
        }
    });
}

exports.Usernames = mongoose.model('Usernames', usernamesSchema);
exports.UserDetails = mongoose.model('GitUserDetails', userdetailsSchema);
exports.totalUserDetails_count = totalUserDetails_count;
