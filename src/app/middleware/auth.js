const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader)
        return res.status(401).json({
            message: 'Token not provided'
        })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
        console.log(decoded)
        req.userId = decoded.id

        if (!decoded.id)
            return res.status(401).json({
                message: 'token invalid'
            })
            
        return next()
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalid'
        })
    }
}