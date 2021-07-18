import { Strategy } from 'passport-google-oauth20';
import  mongoose   from 'mongoose';
import { UserSchema } from '../models/userModel.js';
import { config } from '../assets/config.js';

const User = mongoose.model('User', UserSchema);

export const passports = (passport) =>{
    
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    
    passport.deserializeUser(function(user, cb) {
        User.findOne(user.id, function (err, user) {
            cb(null, user);
        });
    });
    
    passport.use(
        new Strategy({
            clientID: config.googleClientID,
            clientSecret: config.clientSecret,
            callbackURL: 'http://localhost:3000/login/callback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
    
            let user = await User.findOne({email : profile.emails[0].value});
            if(!user){
    
                    const newUser = new User({
                        googleId: profile.id,
                        displayName : profile.displayName,
                        firstName : profile.name[1],
                        lastName : profile.name[0],
                        email : profile.emails[0].value,
                        image : profile.photos[0].value
                    });
    
                    await newUser.save();
                    done(null, newUser);
                }
                else{
                    done(null, user);
                }
        })
      );    
    
}

export const getUserInfo = (req, res) => {
    // console.log('url ' + config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&cuisine=American');
  
    if(req.params.userID != null && req.params.userID != undefined){
      console.log('current user : ' + req.params.userID);
      
      User.find({ userID: req.params.userID },
        (err, user) => {
        if (err) {
          res.send(err);
        }
        res.json(user);
      });
      
    }
    else
    {
        res.send('null');
    }
};

export const createUser = async (req, res) =>{
    let user = await User.findOne({email : req.body.email });
    if(!user){
        const newUser = new User({
            userID: req.body.userID,
            displayName : req.body.displayName,
            firstName : req.body.fname,
            lastName : req.body.lname,
            email : req.body.email,
            image : req.body.photoURL
        });

        await newUser.save();
        res.send(newUser);
    }
    else{
        res.send(user);
    }
};

