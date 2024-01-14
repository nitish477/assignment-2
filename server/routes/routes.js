import express from 'express'
import { login, signup } from '../controller/user.js';


const routes = express.Router()


//public routes
routes.post('/signup',signup)
routes.post('/login',login)
//Private Routes

export default routes
