const express = require('express');
const router = express.Router();
const data = require("../../consumer/data.json");

router.get('/api/v1/location/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1",
        data: data.table
    });
});
module.exports = router;