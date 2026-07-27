const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : {
        type : String,
    },

    password : {
        type : String,
    },

    firstName : {
        type : String,
    },

    lastName : {
        type : String,
    }

})

const AccountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,    // Refrence to user model.
        ref : 'User',
        require : true
    },

    balance :{
        type : Number
    }
})

// Create model of it so provide operation to this structure.
const User = mongoose.model('User' , UserSchema)
const Account = mongoose.model('Account' , AccountSchema)


module.exports = {
    User,
    Account
}