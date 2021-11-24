const express = require('express')
const router = express.Router()

router.get(`/:subpage`, (req, res) => {
    res.render('profile/user_tmplt', {user: req.params.subpage})
})

module.exports = router