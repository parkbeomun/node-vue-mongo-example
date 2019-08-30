const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    // read the token from header or url
    let token = req.headers['x-access-token'] || req.headers['authorization'] //분명 대문자로 헤더를 지정했는데 왜 소문자로 올까..

    if(token.startsWith('Bearer')) {
        token = token.slice(7,token.length)
    }

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, 'secret', (err, decoded) => {
                if(err) reject(err,token)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error,token) => {
        res.status(403).json({
            success: false,
            message: error.message,
            //errorToken: token
        })
    }

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}

module.exports = authMiddleware