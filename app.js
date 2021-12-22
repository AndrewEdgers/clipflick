const express = require('express')
const app = express()
const port = 1488
const mysql = require('mysql')
const favicon = require('serve-favicon')
const path = require("path");
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
const bcrypt = require('bcrypt')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_TABLE
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('DB Connected')
    }
})

app.use(express.static('assets'))
app.use('/styles', express.static(__dirname + 'assets/styles'))
app.use('/js', express.static(__dirname + 'assets/js'))
app.use(express.static('/images'))
app.use('/img', express.static(__dirname + 'images/img'))
app.use(favicon(path.join(__dirname, 'assets/images/cflick.ico')))
app.use(express.static('/videos'))
app.use('/videos', express.static(__dirname + 'videos'))

app.set('views', './views')

const mainRouter = require('./routes/main')
app.use(mainRouter)
app.post('/register', async (req, res) => {
    const {name, email, password, passwordConfirm} = req.body
    let hashedPassword = await bcrypt.hash(password, 10)
    db.query('SELECT email FROM users WHERE email= ?', [email], (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results.length > 0) {
            return res.render('register', {message: 'This email is already in use'})
        } else if (password !== passwordConfirm) {
            return res.render('register', {message: 'Password does not match'})
        } else if (password.length < 6 || password.length > 16) {
            return res.render('register', {message: 'Password length must be between 6 and 16 characters'})
        }
        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (err, results) => {
            if(err) {
                console.log(err)
            } else {
                return res.render('register', {message: 'Your account has been registered'})
            }
        })
    })
})

const cartoonRouter = require('./routes/cartoons')
app.use('/cartoons', cartoonRouter)

const animeRouter = require('./routes/anime')
app.use('/anime', animeRouter)

const userRouter = require('./routes/user')
app.use('/profile', userRouter)

app.listen(port, () => {
    console.info('Listening on port: ' + port)
})
