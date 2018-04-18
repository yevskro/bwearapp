"use strict"
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const port = process.env.PORT || 5000
const app = express()
const session = require('./services/session')
const authorizationMiddleware = require('./middleware/authorization')
const reactMiddleware = require('./middleware/react')
const sessionMiddleware = require('./middleware/session')
const db = require('./db/beachweardb')(
     () => { console.log(`Listening on port ${port}`); app.listen(port) }
    )

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(cookieSession({
    name: 'session',
    secret: "booboo",
    httpOnly: true,
    path: "/",
    domain: "localhost"
  }))

app.use(express.json())

app.use(sessionMiddleware)

app.use(authorizationMiddleware)

app.use(express.static(__dirname + '/client/build/'))

app.use(reactMiddleware)

app.route('/signup')
    .post((req, res, next) => {
        db.User.signUp({email: req.body.user.email, password: req.body.user.password}, (err, userId, userRole) => {
            console.log("role" + userRole)
            session.handle(req, res, {id: userId, role: userRole}, err)
            next()
        })
    })

app.route('/signin')
    .post((req, res, next) => {
        db.User.signIn({email: req.body.user.email, password: req.body.user.password}, (err, userId, userRole) => {
            session.handle(req, res, {id: userId, role: userRole}, err)
            next()
        })
    })