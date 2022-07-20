const express = require('express');
const router = express.Router();
const users = require("../../consumer/data.json");
console.log(users.table[0].device);
router.get('/api/v1/location/', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1",
        device: users.table[0].device
    });
});
module.exports = router;