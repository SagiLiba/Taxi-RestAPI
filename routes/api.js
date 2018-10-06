const express = require('express');
const router = express.Router();
const TaxiDriver = require('../models/taxiDriver');
// Get items
router.get('/drivers',function(req,res,next){

    TaxiDriver.aggregate([
        {
            $geoNear: {
                near: { type: "Point", 
                coordinates: [parseFloat(req.query.lng),
                              parseFloat(req.query.lat)]},
                distanceField: "dist.calculated",
                maxDistance: 1000000,
                spherical: true,
            }
        }
    ]).then(function(driver){
        res.send(driver);
    }).catch(next);
});
// Add new item
router.post('/drivers',function(req,res,next){

    TaxiDriver.create(req.body).then(function(driver){
        res.send(driver);
    }).catch(next);

});
// Update item
router.put('/drivers/:id',function(req,res,next){
    TaxiDriver.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        // Get the updated value
        TaxiDriver.findOne({_id:req.params.id}).then(function(driver){
            res.send(driver);
        });
    });
});
// Delete item from DB
router.delete('/drivers/:id',function(req,res,next){
    TaxiDriver.findByIdAndRemove({_id: req.params.id}).then(function(driver){
        res.send(driver); // return the item that was removed
    });
});

module.exports = router;