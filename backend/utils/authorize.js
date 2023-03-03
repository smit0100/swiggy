const jwt = require('jsonwebtoken')


const authenticateToken = (req, res, next) => {
    console.log(req.body);
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401)

    jwt.verify(token, 'privatekey', (err, user) => {
        if (err) return res.status(403).json('token is failed')
        req.user = user
        next();
    })
}

 

module.exports = authenticateToken