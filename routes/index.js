const Router = require('express')
const routes = new Router()
const RequestController = require('../controllers/RequestController')
const UserController = require('../controllers/User')

routes.post('/registration', UserController.registration)
routes.post('/login', UserController.login)
routes.get('/getuser', UserController.getAll)
routes.delete('/deleteuser', UserController.DelId)
routes.patch('/reduser', UserController.RedId)

routes.post('/req', RequestController.createRequest)
routes.get('/getrequest', RequestController.getAll)
routes.patch('/redrequest', RequestController.RedId)
routes.delete('/delrequest', RequestController.DelId)

module.exports=routes