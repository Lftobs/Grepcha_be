const User =  require('./app/models/auth.model')
const jwt = require('jsonwebtoken')
const db = require("./models");
const Users = db.users;
const isLegit = async (req, res, next) => {
    try {
        const token = req.cookies.token
	console.log(req.cookies.token)
        if (!token){
            //next('Please log in to gain access')
	return res.status(401).send({ message: "Unauthorized!" }) 
        }

        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = await Users.findById(verify.id)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = isLegit
