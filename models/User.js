const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:'o User precisa de um name'
    },
    email:{
        type:String,
        trim:true,
        required:'o User precisa de um email'
    },
    resetTokenPassword:String,
    resetTokenExpired:Date

});


userSchema.plugin(passportLocalMongoose, { usernameField:'email' });

module.exports = mongoose.model('User', userSchema);