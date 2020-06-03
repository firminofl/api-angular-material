const { User } = require('../models')

class SessionController {
    async storeUser(req, res) {
        const { name, email, password } = req.body
        const user = await User.create({
            name,
            email,
            password
        })

        return res.json(user)
    }

    async index(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user)
            return res.status(401).json({
                message: 'User not found'
            })

        if (!(await user.checkPassword(password)))
            return res.status(401).json({
                message: 'Incorrect password'
            })

        return res.json({
            //user,
            token: user.generateToken()
        })
    }
}

module.exports = new SessionController()
