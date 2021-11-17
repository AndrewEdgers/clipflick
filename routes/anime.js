const express = require('express')
const router = express.Router()

router.get(`/:subpage`, (req, res) => {
    res.render('anime/' + req.params.subpage, {video: req.params.subpage})
})

module.exports = router