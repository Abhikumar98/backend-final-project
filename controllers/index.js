var user = require('./../models/user');

module.exports = {
    register: function (req, res, next) {
        
        var { userName, email } = req.body;

        user.findOne({
            $or : [
                {userName} , { email }
            ]
        }, function(err,user){
            if (err) return next(err);
            
            if (user)   return res.status(200).json({
                    message: "User Name or Email Already Taken",
                    data: ""
                });
        }
        )
        user.create(req.body, (err, data) => {
            if (err) return next(err);            
            res.status(200).json({
                message: "User Registered Successfully",
                data: ""
            });
        })
    },

    login: function(req,res,next){

        var { userName, email, password } = req.body;
        user.findOne({
            $or : [
                {userName}, {email}
            ]
        },function(err,user){
            if (err) return next(err);
            
            if(user == null) return res.status(422).json({
                message: "Enter either userName or email",
                data: ""
            })
            
            user.comparepassword(password, function(err, isMatch){
                if (err) return next(err);

                if (isMatch) return res.status(200).json({
                    message: "login successful",
                    data: ""
                })
                
                if (!isMatch) return res.status(422).json({
                    message: "User credentials invalid",
                    data: ""
                })
            })
        })

    }
}