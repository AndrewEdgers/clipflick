const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get(`/:subpage`, (req, res) => {
    let path = 'assets/videos/' + req.params.subpage + '.mp4'
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            res.render('404')
        }
        res.render('cartoons/cartoon_tmplt', {video: req.params.subpage})
    })
})

module.exports = router