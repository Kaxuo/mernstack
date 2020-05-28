const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require("config")
const jwt = require('jsonwebtoken')
// Since we're using router, we use router, if we were in the index or serverjs , then we would use app


// User Model //
const User = require('../../models/User')

// Create some routes ,REGISTER NEW USERS //
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        // 400 = bad request, incorrect info
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    // CHeck existing user
    User.findOne({ email }).then(user => {
        if (user) return res.status(400).json({ msg: "User already exist" })
        const newUser = new User({
            name,
            email,
            password
        })
        // Create salt & hash , 10 is default , longer the better
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(user => {
    // We created this after adding jwt //
                    jwt.sign(
                        // token to verify with the user id or else any token could access anything , we also added token : token below ( above user )
                        {id:user.id},
                        config.get('jwtSecret'),
                        // expire token in 1 h 
                        {expiresIn : 3600},
                        (err,token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                    // res.json({
                    //     user: {
                    //         id: user.id,
                    //         name: user.name,
                    //         email: user.email
                    //     }
                    // })
                })
            })
        })
    })
})



module.exports = router