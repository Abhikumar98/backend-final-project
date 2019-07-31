var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
});


userSchema.pre('save',function(next){
    
    var user = this;

    if(!user.isNew) return next();

    if(!user.password) return next();
    
    bcrypt.hash(
        user.password, 10, function(err,hash){
            if(err) return console.log("error in hashing password");
            user.password = hash;
            console.log("password hashed",user.password);
            next();
        })
})

userSchema.methods.comparepassword = function(enteredPassword, callback){
    bcrypt.compare(enteredPassword, this.password, function (err, isMatch) {
        return callback(err, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema);