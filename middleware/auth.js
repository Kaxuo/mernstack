const config = require('config')
const jwt = require('jsonwebtoken')


// PRIVATE ROUTE


// Get the token sent from react/postman 
function auth(req, res, next) {
    //fetch token 
    const token = req.header('x-auth-token')

    // check for token
    if (!token) 
        // Unautorized , there was an issue that says "cannot set headers ..." you needed to add return below
        return res.status(401).json({ msg: 'No Token, authorization denied' })
        // Verify token
        // from the default.json
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            // Add user from payload
            req.user = decoded
            next()
        } catch (e) {
            res.status(400).json({msg :"Token is not valid"})
        }
}

module.exports = auth