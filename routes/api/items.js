const express = require('express')
const router = express.Router()
var cors = require('cors')
// Since we're using router, we use router, if we were in the index or serverjs , then we would use app

// Item Model //
const Item = require('../../models/Item')

// Create some routes , get API/Items  , get al items //
router.get('/', (req,res) => {
    // fetch items , take the model first(Item)
    Item.find()
        .sort({date:-1})
        // Promise, we get the items and since they're in json , we use res.json and then pass in the items
        .then(items => res.json(items))

})


// Add items //
router.post('/', (req,res) => {
    // new model,with the name of the model
    const newItem = new Item({
        name:req.body.name
    })
    // save to the db it gives us back the item, and then make it json
    newItem.save().then(item => res.json(item))
})


// Delete item, will need ID //
router.delete('/:id', (req,res) => {
    // find the item first
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success:true})))
        //if there are errors, it will catch and display 404 , like wrong id 
        .catch(err => res.status(404).json({success:false}))
})

module.exports = router