const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
//const uuid = require('uuid');


exports.getSignin = (req, res) =>{
    return res.render('signin')
}
exports.getLogin = (req, res) => {
    return res.render('login')
}

exports.postLogin = (req, res) => {
    const values = req.body
    console.log(values)
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
       // res.json({accessToken: token})
        res.render('home', {
            
            content: "welcome, back"


        })
        // let b = new Buffer(hash);
        // let refresh_token = b.toString('base64');
        // res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

// const username = req.body.username
//     const user = {name: username}

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//     res.json({accessToken: accessToken})