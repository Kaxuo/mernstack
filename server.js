const express = require('express')
const mongoose = require('mongoose')
// take request and get data from the body ( like post request, get name of that post from the request)
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express();
const items = require('./routes/api/items')
const path = require("path")


// Bodyparser Middleware //
app.use(bodyParser.json())
app.use(cors())
// DB config  //
const db = require('./config/keys').mongoURI

// connect  to Mongo DB //
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MondoGB Connected ...'))
    .catch(err => console.log(err))

// Use routes , anything that goes to api/items should refer to the items variable(created above, const items = require....)  !!!!!!!!!!!
app.use('/api/items', items)


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