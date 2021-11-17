const express = require('express')
const fs = require("fs");
const router = express.Router()

router.get(`/:page`, (req, res) => {
    let path = 'views/' + req.params.page + '.ejs'
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            res.render('404')
        }
        res.render(req.params.page)
    })
})

module.exports = router