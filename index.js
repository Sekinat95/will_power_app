const config = require('./common/config/env.config');
//console.log(`Your port is ${port}`); // 8080

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const path = require('path')

const UsersRouter = require('./users/routes.config');
const AuthRouter = require('./authorization/routes.config')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});
app.set('views', path.join(__dirname,'views'))
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

UsersRouter.routesConfig(app);
AuthRouter.routesConfig(app)

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});