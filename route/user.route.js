const express = require('express')
const User = require('../model/user.model');
const router = express.Router()

const base64ToString = (base64String) => {
        const convertedStringArray = Buffer.from(base64String, 'base64').toString('ascii').split(':');
        return({
                username: convertedStringArray[0],
                password: convertedStringArray[1]
        })
          
};

router.post('/login', async function (req, res) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                return res.status(401).json({ message: 'Missing Authorization Header' });
            }else{
                const base64Credentials =  req.headers.authorization.split(' ')[1];
                const credentialData = base64ToString(base64Credentials);
                await User.find({username: credentialData.username, password: credentialData.password}, (err, data) => {
                        if(err){
                                return res.status(401).json({message: "Couldn't find user"})
                        }else if(!Array.isArray(data) || !data.length){
                                return res.status(401).json({message: "User doesn't exist"})
                        }else{
                                res.status(200).json(data[0])
                        }
                })
        }

});


router.post('/register', function (req, res) {        
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                return res.status(401).json({ message: 'Missing Authorization Header' });
            }else if(!req.query || !req.query.name){
                return res.status(401).json({ message: 'Missing Name of new User' });
            }else{
                const base64Credentials =  req.headers.authorization.split(' ')[1];
                const data = base64ToString(base64Credentials);
                let newUser = new User({
                        name: req.query.name,
                        username: data.username,
                        password: data.password
                })       
                newUser.save((err, user)=>{

                        if (err) {
                                return res.status(400).json({message: "Couldn't save user"})
                        }else{
                                res.sendStatus(200)        
                        }
                        
                })
        }
});

module.exports = router;