const express = require('express')
const mongoose = require('mongoose')
// take request and get data from the body ( like post request, get name of that post from the request)
var cors = require('cors')
const app = express();
const path = require("path")
const config = require("config")

const items = require('./routes/api/items')
const users = require('./routes/api/users')
// auth is for authentication while users is for create
const auth = require('./routes/api/auth')

// Bodyparser Middleware  we removed bodyparser because express includes it now//
app.use(express.json())
app.use(cors())
// DB config  //
// const db = require('./config/keys').mongoURI
const db = config.get("mongoURI")

// connect  to Mongo DB //
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('MondoGB Connected ...'))
    .catch(err => console.log(err))

// Use routes , anything that goes to api/items should refer to the items variable(created above, const items = require....)  !!!!!!!!!!!
app.use('/api/items', items)
// Can also write below
// app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', users)

// authentication ( not register )
app.use('/api/auth', auth)


// HEROKU EDIT NEEDED HERE  , SERVE STATIC ASSETS IF IN PRODUCTION //
if (process.env.NODE_ENV === "production"){
    // Set static folder
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))