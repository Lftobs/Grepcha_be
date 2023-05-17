const User =  require('./app/models/auth.model')
const jwt = require('jsonwebtoken')
const isLegit = async (req, res, next) => {
    try {
        const {token} = req.cookies
        if (!token) {
            next('Please log in to gain access')
        }

        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = await User.findById(verify.id)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = isLegit