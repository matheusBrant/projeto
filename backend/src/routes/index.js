const express = require('express');
const router = express.Router();
const data = require("../../consumer/data.json");

router.get('/api/v1/location/:device', function (req, res, next) {
    if(data.table){
        if(req.url == `/api/v1/location/${data.table[0].device}`){
            res.status(200).send({
                title: "Node Express API",
                version: "0.0.1",
                device: data.table[0].device,
                data: data.table
            });
        }else{
            res.status(400).send({
                data: 'No data available'
            });
        }
    }else{
        res.status(400).send({
            data: 'No data available'
        });
    }
});
module.exports = router;

