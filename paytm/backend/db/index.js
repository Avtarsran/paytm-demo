const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/paytmWallet")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
        },
    balance: {
        type: Number,
        required: true
    }
})

const Users = mongoose.model("Users",UserSchema)
const Account = mongoose.model("Account",AccountSchema)

module.exports = {
    Users,
    Account
}