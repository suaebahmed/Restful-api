const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const mongoose = require('mongoose');


router.post('/signup',(req,res)=>{

    var newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10,(err,selt)=>{    // wrong genSelt
        bcrypt.hash( newUser.password ,selt,(err,hash)=>{

            if(err){
                res.status(500).json({
                    Error: err,
                    msg: 'err in bcryp'
                }).end();
            }
            else{
                newUser.password = hash;
                newUser.save()
                .then(()=>{
                    res.status(200).json({
                        msg: 'successfully your are regisrared'
                    }).end();
                })
                .catch(err=>{
                 return res.status(500).json({
                     Error: err,
                     msg: 'err in catch'
                }).end();
            })    
        }
    })
})})

router.post('/login',(req,res)=>{
    User.findOne({email: req.body.email})
        .exec()
        .then(user=>{
            console.log(user)
            if(!user){
                return res.status(401).json({
                    msg: 'user not found'
                });
            }
            bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
                if(err){
                    res.status(500).json({
                        Error: err
                    })
                }
                else if(!isMatch){
                    res.status(500).json({
                        msg: "username or password incorrect"
                    })
                }
                else{
                    var token = jwt.sign({
                        username: user.email,
                        userId: user._id,
                        password: user.password  // you can add more info
                    },
                    // process.env.JWT_KEY,
                    'mysecret',
                    {
                        expiresIn: "1h"
                    }
                    )
                    return res.status(200).json({
                        message: 'successfully login',
                        Token: token
                    })
                }
            })
        })
        .catch(err=>{
            return status(500).json({
                Error: err
        })    
})});

router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;