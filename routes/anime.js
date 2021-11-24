const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get(`/:subpage`, (req, res) => {
    let path = 'assets/posters/' + req.params.subpage + '.jpg'
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            res.render('404')
        }
        res.render('anime/anime_tmplt', {video: req.params.subpage})
    })
})

module.exports = router