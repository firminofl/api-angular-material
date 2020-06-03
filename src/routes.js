const routes = require('express').Router()
const SessionController = require('./app/controllers/SessionsController')
const authMiddleware = require('./app/middleware/auth')

// Definição rotas
// routes.post('/sessions', SessionController.store)

routes.post('/create-user', SessionController.storeUser)

routes.post('/login', SessionController.index)

// Middleware de autenticação
// Tudo abaixo disto deverá ser autenticado
routes.use(authMiddleware)

routes.get('/dashboard', (req, res) => {
    return res.status(200).send({
        message: 'Sucesso'
    })
})

module.exports = routes