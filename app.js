const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    })
})

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData
            })        
        }
    })
})

app.post('/api/login', (req, res) => {
    // Mock user db auth stuff
    const user = {
        ud: 1,
        username: 'skytos'
    }

    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({token})
    })
})

function verifyToken(req, res, next) {
    // Get auth header
    // looks like Authorization: Bearer <access_toke>
    const bearerHeader = req.headers.authorization
    const bearerToken = bearerHeader && bearerHeader.split(' ')[1]
    if (bearerToken) {
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('Server started on port 5000'))