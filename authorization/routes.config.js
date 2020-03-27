const VerifyUserMiddleware = require('./middlewares/verify.user.middleware');
const AuthorizationController = require('./controllers/authorization.controller');
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
exports.routesConfig = function (app) {

    // app.get('/',function(req, res){
    //     return res.redirect('/login')
    // })
    app.get('/signin',
    AuthorizationController.getSignin)

    app.get('/login', 
        AuthorizationController.getLogin

    )
    // app.post('/submit-login',
    // AuthorizationController.postLogin)
    

    app.post('/submit-login', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.postLogin
    ]);

    // app.post('/auth/refresh', [
    //     AuthValidationMiddleware.validJWTNeeded,
    //     AuthValidationMiddleware.verifyRefreshBodyField,
    //     AuthValidationMiddleware.validRefreshNeeded,
    //     AuthorizationController.login
    // ]);
};