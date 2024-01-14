import express from 'express'
import { login, signup } from '../controller/user.js';
import { PostSecret, getSecret } from '../controller/secret.js';


const routes = express.Router()


//public routes
routes.post('/signup',signup)
routes.post('/login',login)
//Private Routes

routes.post('/secrets',PostSecret)
routes.get('/fetchs',getSecret)

export default routes
