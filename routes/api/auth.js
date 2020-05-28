const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require("config")
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
// Since we're using router, we use router, if we were in the index or serverjs , then we would use app


// User Model //
const User = require('../../models/User')

// Auth user //
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        // 400 = bad request, incorrect info
        return res.status(400).json({ msg: 'Please enter all fields' })
    }
    // CHeck existing user , and if user do not exist, then 400
    User.findOne({ email }).then(user => {
        if (!user) return res.status(400).json({ msg: "User does not exist" })

    // VALIDATE PASSWORD,user.password is the hash password , we compare the two

    bcrypt.compare(password,user.password)
    // if password matchs
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg : 'Invalid Credentials'})

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
        }) 

    })
})

// Route GET request to api/auth/users
// Get user data 
// Private   , mainly, maintains the session of the user so he doesn't have to reload everytilme
// It knows what user it is based on the token ! ! 
router.get('/user', auth,(req,res) => {
    //User model
    User.findById(req.user.id)
        // dont want to return password
        .select('-password')
        // give promise with user
        .then(user => res.json(user))
})



module.exports = router