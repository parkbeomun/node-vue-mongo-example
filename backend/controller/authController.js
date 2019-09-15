const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*

    POST /api/auth/register
    {
        email,
        password,
        name
    }

 */
exports.register = (req, res, next) => {
    const { email, password, name} = req.body
    let newUser = null

    //create a new user if does not exist
    const create = (user) => {
        if(user){
            throw new Error('username exists')
        }else{
            return User.create(email, password, name)
        }
    }

    //const the number of the user
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    //assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            return Promise.resolve(false)
        }
    }

    //respond the client
    const respond = (isAdmin) => {
        res.json({
            message: 'resistered successfully',
            admin: isAdmin ? true : false
        })
    }

    //run when there is error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: 'onError ' + error.message + ":" + email
        })
    }

    //check username duplication
    User.findOneByEmail(email)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)

}


/*

    POST /api/auth/login
    {
        email,
        password
    }

 */

exports.login = (req, res, next) => {
    const {email, password} = req.body

    const check = (user) => {

        if(!user) {
            throw Exception('이메일을 확인하세요')
        } else {
            if(user.verify(password)) {
                const p = new Promise((resolve, reject) => {
                    console.log(user)
                    jwt.sign( //jwt.sign(payload, secretOrPrivateKey, [options, callback]).
                        {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            admin: user.admin
                        },
                        'secret',
                        {
                            expiresIn: '7d',
                            issuer: '',
                            subject: 'userinfo'
                        }, (err, token) => {
                            console.log('console :',token)
                            if(err) reject(err)
                            console.log('test1')
                            resolve({
                                token,
                                name: username
                            })
                        })
                })
                console.log('return promise')
                return p

            } else {
                throw new Error('패스워드가 틀립니다')
            }




        }
    } //end check

    const respond = (data, name) => {
        console.log('response')
        res.json({
            message: 'logged in successfully',
            token: data.token,
            name: data.name
        })
    }

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    //MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});
    User.findOneByEmail(email)
        .then(check)
        .then(respond)
        .catch(onError)

};

/* https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4 */
exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}

exports.me = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}


/*

    GET /api/auth/naver
    {

    }

 */
var request = require('request')

exports.naver = (req, res, next) => {

    const client_id = process.env.NAVER_CLIENT_KEY
    const client_secret = process.env.NAVER_CLIENT_SECRET
    const state = "RAMDOM_STATE";
    const redirectURI = encodeURI(`${process.env.NAVER_CALLBACK_URL}`);
    console.log(process.env.NAVER_CALLBACK_URL)
    console.log(redirectURI)
    // console.log(client_id)
    let api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`

    /*

    options = {
        url: api_url,
    }
    request.get(options, (error, response, body) => {
        res.write(body)
        res.end()
    })
     */

    res.json(api_url)


}

/*

    POST /api/auth/naver/callback
    {
        code,
        state
    }

 */

exports.naver_callback = (req, res, next) => {

    const code = req.query.code;
    const state = req.query.state;
    const client_id = process.env.NAVER_CLIENT_KEY
    const client_secret = process.env.NAVER_CLIENT_SECRET
    const redirectURI = encodeURI(`${process.env.NAVER_CALLBACK_URL}`);

    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(200, JSON.parse(body))
            // getNaverMe(JSON.parse(body))
            //     .then((data) => {
            //         console.log(body)
            //         data['access_token'] = body['access_token']
            //         data['refresh_token'] = body['refresh_token']
            //         data['token_type'] = body['token_type']
            //         res.json(200,data)
            //     })
            //     .catch((error) => {
            //         res.status(403).json({
            //             message: error
            //         })
            //     })
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });

}

/*

    POST /api/auth/naver/me
    {
        access_token,
        token_type
    }

 */

exports.naver_me = (req, res, next) => {

    getNaverMe(req.body)
        .then((data) => {
            res.json(200,data)
        })
        .catch((err) => {
            res.status(403).json({
                message: error
            })
        })

}

var getNaverMe = function (data) {


    return new Promise((resolve,reject) => {
        var token = data['access_token']
        var header = "Bearer " + token; // Bearer 다음에 공백 추가

        var api_url = 'https://openapi.naver.com/v1/nid/me';
        var options = {
            url: api_url,
            headers: {'Authorization': header}
        };

        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(JSON.parse(body))
            } else {
                console.log('error');
                if(response != null) {
                    console.log('error = ' + response.statusCode);
                }

                reject(error)
            }
        });
    })
}


