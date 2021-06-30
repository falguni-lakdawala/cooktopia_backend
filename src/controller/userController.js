import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel.js';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) =>{
    if(req.headers.authorization){
        if(req.headers && req.headers.authorization && 
            req.headers.authorization.split(' ')[0] == 'JWT'){
                jwt.verify(req.headers.authorization.split(' ')[1], 'COOKTOPIA_APIs', 
                (err, decode) =>{
                    if(err){
                        req.user = undefined;
                    }
                    req.user = decode;
                    next();
                })
            }
    }
    else{
        return res.status(401).json({message : 'Unauthorized user!'});
    }
}

export const register = (req, res) =>{
    const newUser = new User(req.body);

    newUser.hasPassword = bcrypt.hashSync(req.body.password, 10);

    newUser.save((err, user) => {
        if(err){
            return res.status(400).json({message : err});
        }
        else{
            user.hasPassword = undefined;
            return res.json(user);
        }
    })
}

export const login = (req, res) =>{
    User.findOne({
        email : req.body.email
    }, (err, user) => {
        if(err)
            throw err;
        if(!user){
            res.status(401).json({message : 'Authentication failed. No user found!'});
        }
        else if(user){
            if(!user.comparePassword(req.body.password, user.hasPassword)){
                res.status(401).json({message : 'Authentication failed. Wrong password!'});
            }
            else{
                return res.json({token : jwt.sign({email : user.email, 
                    username : user.username, _id : user.id}, 'COOKTOPIA_APIs')})
            }
        }
    })
}