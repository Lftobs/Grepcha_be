module.exports = app => {
    const users = require("../controllers/auth.controllers");
  
    var router = require("express").Router();

    // sign up route
    router.post('/sign-up', users.signUp)

    // login route
    router.post('/log-in', users.signIn)

    app.use('/api/auth', router);
}