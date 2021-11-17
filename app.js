const express = require('express')
const app = express()
const port = 1488
const favicon = require('serve-favicon')
const path = require("path");
app.set('view engine', 'ejs')

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

const cartoonRouter = require('./routes/cartoons')
app.use('/cartoons', cartoonRouter)

const animeRouter = require('./routes/anime')
app.use('/anime', animeRouter)

app.listen(port, () => {
    console.info('Listening on port: ' + port)
})
